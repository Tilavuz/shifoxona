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
  import useLoading from "@/hooks/use-loading";
  import { PositionInterface } from "@/interface/position";
  import { DialogTitle } from "@radix-ui/react-dialog";
  import axios from "axios";
  import { Pencil, Plus, Trash2 } from "lucide-react";
  import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
  import { useCookies } from "react-cookie";
  import { Link } from "react-router-dom";
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  
  export default function Position() {
    const [cookies] = useCookies();
    const positionRef = useRef<HTMLInputElement>(null);
    const [positions, setPositions] = useState<PositionInterface[]>([]);
    const editPositionRef = useRef<HTMLInputElement>(null);
    const { isPending, loading } = useLoading()
  
    const getAllPosition = useCallback(async () => {
      try {
        const res = await axios.get(`${apiUrl}position`, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        setPositions(res.data);
      } catch (error) {
        console.error("Error fetching Positions:", error);
      }
    }, [cookies?.token]);
  
    const addPosition = async (e: FormEvent) => {
      e.preventDefault();
      try {
        const title = positionRef?.current?.value;
  
        await axios.post(
          `${apiUrl}position`,
          { title },
          {
            headers: {
              Authorization: `Bearer ${cookies?.token}`,
            },
          }
        );
        getAllPosition();
      } catch (err) {
        console.log(err);
      }
    };
  
    const deletePosition = async (id: string) => {
      try {
        await axios.delete(`${apiUrl}position/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllPosition();
      } catch (err) {
        console.log(err);
      }
    };
  
    const editPosition = async (id: string) => {
      try {
        isPending(true)
        const changeData = {
          _id: id,
          title: editPositionRef?.current?.value
        }
        await axios.put(`${apiUrl}position/`, changeData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllPosition();
      } catch (err) {
        console.log(err);
      }finally {
        isPending(false)
      }
    };
  
    useEffect(() => {
      getAllPosition();
    }, [getAllPosition]);
  
    return (
      <div className="">
        <div className="container">
          <div className="flex items-center justify-between mt-8">
            <h2 className="font-bold text-xl">Position</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                  Position
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Position</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => addPosition(e)}>
                  <Input
                    ref={positionRef}
                    className="mb-4"
                    placeholder="Position title"
                  />
                  <DialogClose><Button>Submit</Button></DialogClose>
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
              {positions?.map((position, i) => {
                return (
                  <tr key={position._id}>
                    <td className="border py-2 border-black text-center">
                      {i + 1}
                    </td>
                    <td className="border py-2 border-black text-center">
                      <Link to={`${apiUrl}Position/${position._id}`}>
                        {position.title}
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
                            <DialogTitle>Edit Position</DialogTitle>
                          </DialogHeader>
                            <Input
                              ref={editPositionRef}
                              className="mb-4"
                              placeholder="Position title"
                              defaultValue={position?.title}
                              disabled={loading}
                            />
                            <DialogClose><Button onClick={() => editPosition(position._id)}>{loading ? 'loading' : 'Change'}</Button></DialogClose>
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
                              onClick={() => deletePosition(position._id)}
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
  