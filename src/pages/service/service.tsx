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
import UseGetService from "@/hooks/use-get-service";
import useLoading from "@/hooks/use-loading";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Service() {
  const [cookies] = useCookies();
  const serviceRef = useRef<HTMLInputElement>(null);
  const { services, getAllService } = UseGetService();
  const editServiceRef = useRef<HTMLInputElement>(null);
  const { isPending, loading } = useLoading();

  const addService = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const title = serviceRef?.current?.value;

      await axios.post(
        `${apiUrl}service`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        }
      );
      getAllService();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteService = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}service/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllService();
    } catch (err) {
      console.log(err);
    }
  };

  const editService = async (id: string) => {
    try {
      isPending(true);
      const changeData = {
        _id: id,
        title: editServiceRef?.current?.value,
      };
      await axios.put(`${apiUrl}service/`, changeData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllService();
    } catch (err) {
      console.log(err);
    } finally {
      isPending(false);
    }
  };

  useEffect(() => {
    getAllService();
  }, [getAllService]);

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">Service</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => addService(e)}>
                <Input
                  ref={serviceRef}
                  className="mb-4"
                  placeholder="Service title"
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
            {services?.map((service, i) => {
              return (
                <tr key={service._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Link to={`${apiUrl}service/${service._id}`}>
                      {service.title}
                    </Link>
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
                          <DialogTitle>Edit Service</DialogTitle>
                        </DialogHeader>
                        <Input
                          ref={editServiceRef}
                          className="mb-4"
                          placeholder="Service title"
                          defaultValue={service?.title}
                          disabled={loading}
                        />
                        <DialogClose>
                          <Button onClick={() => editService(service._id)}>
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
                            onClick={() => deleteService(service._id)}
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
