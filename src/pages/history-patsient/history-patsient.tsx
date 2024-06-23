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
import UseGetDoctor from "@/hooks/use-get-doctor";
import { HistoryPatsientInterface } from "@/interface/history-patsient";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function HistoryPatsient() {
  const { getAllDoctors, doctors } = UseGetDoctor();
  const diagnosTypeRef = useRef<HTMLInputElement>(null);
  const diagnosRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [doctor, setdoctor] = useState<string>();
  const [cookies] = useCookies();
  const { id } = useParams();
  const [historyPatsients, setHistoryPatsients] = useState<
    HistoryPatsientInterface[] | null
  >(null);

  const getAllHistoryPatsient = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}historypatsient/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setHistoryPatsients(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [cookies?.token, id]);

  const addHistoryPatsient = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        diagnosType: diagnosTypeRef?.current?.value,
        diagnos: diagnosRef?.current?.value,
        patsient: id,
        doctor,
        date: dateRef?.current?.value,
      };

      if (
        postData.diagnos &&
        postData.diagnosType &&
        postData.patsient &&
        postData.doctor &&
        postData.date
      ) {
        const res = await axios.post(`${apiUrl}historypatsient`, postData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        console.log(res);
      }
      getAllHistoryPatsient();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHistoryPatsient = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}historypatsient/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllHistoryPatsient();
    } catch (err) {
      console.log(err);
    }
  };

  const editHistoryPatsient = async (e: FormEvent, _id: string) => {
    e.preventDefault();
    try {
      const putData = {
        _id,
        diagnosType: diagnosTypeRef?.current?.value,
        diagnos: diagnosRef?.current?.value,
        patsient: id,
        doctor,
        date: dateRef?.current?.value,
      };
      if (
        putData.diagnos &&
        putData.diagnosType &&
        putData.patsient &&
        putData.doctor &&
        putData.date
      ) {
        await axios.put(`${apiUrl}historypatsient/${id}`, putData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllHistoryPatsient();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllHistoryPatsient();
    getAllDoctors();
  }, [getAllDoctors, getAllHistoryPatsient]);

  return (
    <div>
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">History Patsient</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                History Patsient
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add history Patsient</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => addHistoryPatsient(e)}
                className="flex flex-col gap-4"
              >
                <Input
                  ref={diagnosTypeRef}
                  type="text"
                  placeholder="Diagnos type"
                />
                <Input ref={diagnosRef} type="text" placeholder="Diagnos" />
                <div className="flex items-center gap-2">
                  <Input type="text" value={id} disabled={true} />
                  <Select onValueChange={(e) => setdoctor(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {doctors?.map((doctor) => {
                          return (
                            <SelectItem key={doctor._id} value={doctor._id}>
                              {doctor.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Label className="flex-1 font-bold text-base">
                  Date
                  <Input ref={dateRef} type="date" />
                </Label>
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
              <th className="border border-black">Doctor</th>
              <th className="border border-black">Diagnos type</th>
              <th className="border border-black">Diagnos</th>
              <th className="border border-black">Date</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {historyPatsients?.map((historyPatsient, i) => {
              return (
                <tr key={historyPatsient._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {typeof historyPatsient.patsient === "object"
                      ? historyPatsient.patsient.name
                      : "N/A"}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {typeof historyPatsient.doctor === 'string' && historyPatsient.doctor}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyPatsient.diagnosType}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyPatsient.diagnos}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {historyPatsient.date}
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
                          <DialogTitle>Edit history Patsient</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) =>
                            editHistoryPatsient(e, historyPatsient._id)
                          }
                          className="flex flex-col gap-4"
                        >
                          <Input
                            ref={diagnosTypeRef}
                            type="text"
                            placeholder="Diagnos type"
                            defaultValue={historyPatsient.diagnosType}
                          />
                          <Input
                            ref={diagnosRef}
                            type="text"
                            placeholder="Diagnos"
                            defaultValue={historyPatsient.diagnos}
                          />
                          <div className="flex items-center gap-2">
                            <Input type="text" value={id} disabled={true} />
                            <Select onValueChange={(e) => setdoctor(e)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select doctor" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {doctors?.map((doctor) => {
                                    return (
                                      <SelectItem
                                        key={doctor._id}
                                        value={doctor._id}
                                      >
                                        {doctor.name}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <Label className="flex-1 font-bold text-base">
                            Date
                            <Input ref={dateRef} type="date" />
                          </Label>
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
                              deleteHistoryPatsient(historyPatsient._id)
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
