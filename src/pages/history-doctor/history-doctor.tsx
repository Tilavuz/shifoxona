import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseGetPosition from "@/hooks/use-get-position";
import { HistoryDoctorInterface } from "@/interface/history-doctor";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function HistoryDoctor() {
  const { getAllPositions, positions } = UseGetPosition();
  const workplaceRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState<string>();
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [cookies] = useCookies();
  const { id } = useParams();
  const [historyDoctors, setHistoryDoctors] = useState<
    HistoryDoctorInterface[] | null
  >(null);

  const getAllHistoryDoctor = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}history/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setHistoryDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [cookies?.token, id]);

  const addHistoryDoctor = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        doctor: id,
        position,
        title: workplaceRef?.current?.value,
        startDate: startDateRef?.current?.value,
        endDate: endDateRef?.current?.value,
      };

      if (
        postData.doctor &&
        postData.endDate &&
        postData.position &&
        postData.startDate &&
        postData.title
      ) {
        const res = await axios.post(`${apiUrl}history`, postData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        console.log(res);
      }
      getAllHistoryDoctor();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHistoryDoctor = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}history/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllHistoryDoctor();
    } catch (err) {
      console.log(err);
    }
  };

  const editHistoryDoctor = async (e: FormEvent, _id: string) => {
    e.preventDefault();
    try {
      const putData = {
        _id,
        doctor: id,
        position,
        title: workplaceRef?.current?.value,
        startDate: startDateRef?.current?.value,
        endDate: endDateRef?.current?.value,
      };
      if (
        putData._id &&
        putData.doctor &&
        putData.endDate &&
        putData.position &&
        putData.startDate &&
        putData.title
      ) {
        await axios.put(`${apiUrl}history/${id}`, putData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllHistoryDoctor()
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllHistoryDoctor();
    getAllPositions();
  }, [getAllPositions, getAllHistoryDoctor]);

  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">History doctor</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                History doctor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add history doctor</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => addHistoryDoctor(e)}
                className="flex flex-col gap-4"
              >
                <Input ref={workplaceRef} type="text" placeholder="Workplace" />
                <div className="flex items-center gap-2">
                  <Input type="text" value={id} disabled={true} />
                  <Select onValueChange={(e) => setPosition(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {positions?.map((position) => {
                          return (
                            <SelectItem key={position._id} value={position._id}>
                              {position.title}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="flex-1 font-bold text-base">
                    Start date
                    <Input ref={startDateRef} type="date" />
                  </Label>
                  <Label className="flex-1 font-bold text-base">
                    End date
                    <Input ref={endDateRef} type="date" />
                  </Label>
                </div>
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
              <th className="border border-black">Name</th>
              <th className="border border-black">Title</th>
              <th className="border border-black">Position</th>
              <th className="border border-black">Start date</th>
              <th className="border border-black">End Date</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {historyDoctors?.map((historyDoctor, i) => {
              return (
                <tr key={historyDoctor._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {typeof historyDoctor.doctor === "object"
                      ? historyDoctor.doctor.name
                      : "N/A"}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyDoctor.title}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyDoctor.position}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyDoctor.startDate}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyDoctor.endDate}
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
                          <DialogTitle>Edit history doctor</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => editHistoryDoctor(e, historyDoctor._id)}
                          className="flex flex-col gap-4"
                        >
                          <Input
                            ref={workplaceRef}
                            defaultValue={historyDoctor.title}
                            type="text"
                            placeholder="Workplace"
                          />
                          <div className="flex items-center gap-2">
                            <Input type="text" value={id} disabled={true} />
                            <Select onValueChange={(e) => setPosition(e)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {positions?.map((position) => {
                                    return (
                                      <SelectItem
                                        key={position._id}
                                        value={position._id}
                                      >
                                        {position.title}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="flex-1 font-bold text-base">
                              Start date
                              <Input ref={startDateRef} type="date" />
                            </Label>
                            <Label className="flex-1 font-bold text-base">
                              End date
                              <Input ref={endDateRef} type="date" />
                            </Label>
                          </div>
                          <DialogClose>
                            <Button className="w-full">Submit</Button>
                          </DialogClose>
                        </form>
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
                            onClick={() =>
                              deleteHistoryDoctor(historyDoctor._id)
                            }
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
