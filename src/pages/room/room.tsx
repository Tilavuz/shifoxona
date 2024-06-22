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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DepartmentInterface } from "@/interface/department";
import { RoomInterfae } from "@/interface/room";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Room() {
  const [cookies] = useCookies();
  const [rooms, setRooms] = useState<RoomInterfae[] | null>(null);
  const [departments, setDepartments] = useState<DepartmentInterface[]>([]);
  const roomNumberRef = useRef<HTMLInputElement>(null);
  const roomCapacityRef = useRef<HTMLInputElement>(null);
  const [department, setDepartment] = useState<string>();
  const editRoomNumberRef = useRef<HTMLInputElement>(null);
  const editRoomCapacityRef = useRef<HTMLInputElement>(null);
  const [editDepartment, setEditDepartment] = useState<string>();

  const getAllRoom = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}room`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setRooms(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [cookies?.token]);

  const editRoom = async (e: FormEvent, _id: string) => {
    e.preventDefault();
    try {
      const changeData = {
        _id,
        department: editDepartment,
        number: editRoomNumberRef?.current?.value,
        maxcount: editRoomCapacityRef?.current?.value,
      };
      await axios.put(`${apiUrl}room/`, changeData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllRoom();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}room/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllRoom();
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    getAllRoom();
    getAllDepartment();
  }, [getAllRoom, getAllDepartment]);

  const addRoom = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        department,
        number: roomNumberRef?.current?.value,
        maxcount: roomCapacityRef?.current?.value,
      };

      if (postData.department && postData.maxcount && postData.number) {
        await axios.post(`${apiUrl}room`, postData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllRoom();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">Rooms</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Room
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add room</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => addRoom(e)}
                className="flex flex-col gap-4"
              >
                <Input
                  ref={roomNumberRef}
                  type="text"
                  placeholder="Room number"
                />
                <Input
                  ref={roomCapacityRef}
                  type="text"
                  placeholder="Room capacity"
                />
                <Select onValueChange={(e) => setDepartment(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {departments?.map((department) => {
                        return (
                          <SelectItem
                            key={department._id}
                            value={department._id}
                          >
                            {department.title}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <DialogClose>
                  <Button className="w-full">Submit</Button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <table width={"100%"} className="mt-8">
          <thead>
            <tr>
              <th className="border border-black w-8">#N</th>
              <th className="border border-black">Department</th>
              <th className="border border-black">Room number</th>
              <th className="border border-black">Room capacity</th>
              <th className="border border-black">Was created</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room, i) => {
              return (
                <tr key={room._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Link to={`${apiUrl}department/${room._id}`}>
                      {room.department}
                    </Link>
                  </td>
                  <td className="border py-2 border-black text-center">
                    {room.number}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {room.maxcount}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {room.createdTime
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="mr-2" variant={"outline"}>
                              <Pencil />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit room</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={(e) => editRoom(e, room._id)}
                              className="flex flex-col gap-4"
                            >
                              <Input
                                ref={editRoomNumberRef}
                                type="text"
                                defaultValue={room.number}
                                placeholder="Room number"
                              />
                              <Input
                                ref={editRoomCapacityRef}
                                type="text"
                                defaultValue={room.maxcount}
                                placeholder="Room capacity"
                              />
                              <Select
                                onValueChange={(e) => setEditDepartment(e)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {departments?.map((department) => {
                                      return (
                                        <SelectItem
                                          key={department._id}
                                          value={department._id}
                                        >
                                          {department.title}
                                        </SelectItem>
                                      );
                                    })}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <DialogClose>
                                <Button className="w-full">Change</Button>
                              </DialogClose>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit department</DialogTitle>
                        </DialogHeader>
                        <Input className="mb-4" />
                        <DialogClose>
                          <Button>change</Button>
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
                            onClick={() => deleteRoom(room._id)}
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
