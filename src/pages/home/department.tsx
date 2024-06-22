import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DepartmentInterface } from "@/interface/department";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Department() {
  const [cookies] = useCookies();
  const departmentRef = useRef<HTMLInputElement>(null)
  const [departments, setDepartments] = useState<DepartmentInterface[]>([])

  const addDepartment = async (e: FormEvent) => {
    e.preventDefault()
    try {

      const title = departmentRef?.current?.value

      const res = await axios.post(`${apiUrl}department`, { title }, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`
        }
      })
      console.log(res);
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getAllDepartment = async () => {
      try {
        const res = await axios.get(`${apiUrl}department`, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        setDepartments(res.data);
        console.log(res.data);
        
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    getAllDepartment();
  }, [cookies?.token]);

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
                <Input ref={departmentRef} className="mb-4" placeholder="Department title" />
                <Button>Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <table width={'100%'} className="mt-8">
          <thead>
            <tr>
              <th className="border border-black w-8">#N</th>
              <th className="border border-black">Title</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {
              departments?.map(department => {
                return (
                  <tr key={department._id}>
                    <td className="border py-2 border-black text-center">{department.status}</td>
                    <td className="border py-2 border-black text-center"><Link to={`${apiUrl}department/${department._id}`}>{department.title}</Link></td>
                    <td className="border py-2 border-black text-center">
                      <Button className="mr-2" variant={'outline'}><Pencil /></Button>
                      <Button variant={'destructive'}><Trash2 /></Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
