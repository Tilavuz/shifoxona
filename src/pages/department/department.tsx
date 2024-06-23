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
import { DepartmentInterface } from "@/interface/department";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Department() {
  const [cookies] = useCookies();
  const departmentRef = useRef<HTMLInputElement>(null);
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const editDepartmentRef = useRef<HTMLInputElement>(null);
  const { isPending, loading } = useLoading();

  const getAllDepartment = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}department`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setDepartments(res.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }, [cookies?.token]);

  const addDepartment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const title = departmentRef?.current?.value;

      await axios.post(
        `${apiUrl}department`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        }
      );
      getAllDepartment();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}department/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllDepartment();
    } catch (err) {
      console.log(err);
    }
  };

  const editDepartment = async (id: string) => {
    try {
      isPending(true);
      const changeData = {
        _id: id,
        title: editDepartmentRef?.current?.value,
      };
      await axios.put(`${apiUrl}department/`, changeData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllDepartment();
    } catch (err) {
      console.log(err);
    } finally {
      isPending(false);
    }
  };

  useEffect(() => {
    getAllDepartment();
  }, [getAllDepartment]);

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">Department</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add department</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => addDepartment(e)}>
                <Input
                  ref={departmentRef}
                  className="mb-4"
                  placeholder="Department title"
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
            {departments?.map((department, i) => {
              return (
                <tr key={department._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {department.title}
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
                          <DialogTitle>Edit department</DialogTitle>
                        </DialogHeader>
                        <Input
                          ref={editDepartmentRef}
                          className="mb-4"
                          placeholder="Department title"
                          defaultValue={department?.title}
                          disabled={loading}
                        />
                        <DialogClose>
                          <Button
                            onClick={() => editDepartment(department._id)}
                          >
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
                            onClick={() => deleteDepartment(department._id)}
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
