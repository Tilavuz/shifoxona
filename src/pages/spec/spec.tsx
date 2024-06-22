import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import UseGetSpec from "@/hooks/use-get-spec";
import useLoading from "@/hooks/use-loading";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Spec() {
  const [cookies] = useCookies();
  const specRef = useRef<HTMLInputElement>(null);
  const {specs, getAllSpec} = UseGetSpec()
  const edtSprecRef = useRef<HTMLInputElement>(null);
  const { isPending, loading } = useLoading();

  const adSprec = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const title = specRef?.current?.value;

      await axios.post(
        `${apiUrl}spec`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        }
      );
      getAllSpec();
    } catch (err) {
      console.log(err);
    }
  };

  const deeteSprec = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}spec/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllSpec();
    } catch (err) {
      console.log(err);
    }
  };

  const edtSprec = async (id: string) => {
    try {
      isPending(true);
      const changeData = {
        _id: id,
        title: edtSprecRef?.current?.value,
      };
      await axios.put(`${apiUrl}spec/`, changeData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllSpec();
    } catch (err) {
      console.log(err);
    } finally {
      isPending(false);
    }
  };

  useEffect(() => {
    getAllSpec();
  }, [getAllSpec]);

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">Spec</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Spec
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add spec</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => adSprec(e)}>
                <Input
                  ref={specRef}
                  className="mb-4"
                  placeholder="Spec title"
                />
                <DialogClose>
                  <Button>Submit</Button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <table width={"100%"} className="mt-8">
          <thead>
            <tr>
              <th className="border border-black w-8">#N</th>
              <th className="border border-black">Title</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {specs?.map((spec, i) => {
              return (
                <tr key={spec._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Link to={`${apiUrl}spec/${spec._id}`}>{spec.title}</Link>
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mr-2" variant={"outline"}>
                          <Pencil />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit spec</DialogTitle>
                        </DialogHeader>
                        <Input
                          ref={edtSprecRef}
                          className="mb-4"
                          placeholder="spec title"
                          defaultValue={spec?.title}
                          disabled={loading}
                        />
                        <DialogClose>
                          <Button onClick={() => edtSprec(spec._id)}>
                            {loading ? "loading" : "Change"}
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant={"destructive"}>
                          <Trash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure you want to delete?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deeteSprec(spec._id)}
                          >
                            Yes
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
