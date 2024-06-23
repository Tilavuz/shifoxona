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
import UseGetService from "@/hooks/use-get-service";
import { PatsientInterface } from "@/interface/patsient";
import { TreatmentInterface } from "@/interface/treatment";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Treatment() {
  const [cookies] = useCookies();
  const [Treatments, setTreatments] = useState<TreatmentInterface[] | null>(
    null
  );
  const [patsients, setPatsients] = useState<PatsientInterface[]>([]);
  const [service, setService] = useState<string>();
  const commentRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [patsient, setPatsient] = useState<string>();
  const { services, getAllService } = UseGetService();

  const getAllTreatment = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}treatment`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setTreatments(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [cookies?.token]);

  const editTreatment = async (e: FormEvent, _id: string) => {
    e.preventDefault();
    try {
      const changeData = {
        _id,
        patsient,
        service,
        date: dateRef?.current?.value,
        comment: commentRef?.current?.value,
        price: priceRef?.current?.value,
      };
      await axios.put(`${apiUrl}treatment/`, changeData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllTreatment();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTreatment = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}treatment/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllTreatment();
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPatsient = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}patsient`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setPatsients(res.data);
    } catch (error) {
      console.error("Error fetching Patsients:", error);
    }
  }, [cookies?.token]);

  useEffect(() => {
    getAllTreatment();
    getAllService();
    getAllPatsient();
  }, [getAllTreatment, getAllPatsient, getAllService]);

  const addTreatment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        patsient,
        service,
        date: dateRef?.current?.value,
        comment: commentRef?.current?.value,
        price: priceRef?.current?.value,
      };

      if (
        (postData.patsient && postData.service && postData.date,
        postData.comment,
        postData.price)
      ) {
        await axios.post(`${apiUrl}treatment`, postData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllTreatment();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">Treatments</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Treatment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Treatment</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => addTreatment(e)}
                className="flex flex-col gap-4"
              >
                <Input ref={commentRef} type="text" placeholder="Comment" />
                <div className="flex items-center gap-2">
                  <Input ref={dateRef} type="date" />
                  <Input ref={priceRef} type="number" placeholder="Price" />
                </div>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(e) => setPatsient(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patsient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {patsients?.map((patsient) => {
                          return (
                            <SelectItem key={patsient._id} value={patsient._id}>
                              {patsient.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(e) => setService(e)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {services?.map((service) => {
                          return (
                            <SelectItem key={service._id} value={service._id}>
                              {service.title}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
              <th className="border border-black">Patsient</th>
              <th className="border border-black">Service</th>
              <th className="border border-black">Comment</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Date</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {Treatments?.map((treatment, i) => {
              return (
                <tr key={treatment._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {treatment.patsient}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {treatment.service}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {treatment.comment}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {treatment.price}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {treatment.date}
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
                              <DialogTitle>Edit Treatment</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={(e) => editTreatment(e,treatment._id)}
                              className="flex flex-col gap-4"
                            >
                              <Input
                                ref={commentRef}
                                type="text"
                                placeholder="Comment"
                                defaultValue={treatment.comment}
                              />
                              <div className="flex items-center gap-2">
                                <Input ref={dateRef} type="date" />
                                <Input
                                  ref={priceRef}
                                  type="number"
                                  placeholder="Price"
                                  defaultValue={treatment.price}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Select onValueChange={(e) => setPatsient(e)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select patsient" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {patsients?.map((patsient) => {
                                        return (
                                          <SelectItem
                                            key={patsient._id}
                                            value={patsient._id}
                                          >
                                            {patsient.name}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <Select onValueChange={(e) => setService(e)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select service" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {services?.map((service) => {
                                        return (
                                          <SelectItem
                                            key={service._id}
                                            value={service._id}
                                          >
                                            {service.title}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                              <DialogClose>
                                <Button className="w-full">Submit</Button>
                              </DialogClose>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </DialogTrigger>
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
                            onClick={() => deleteTreatment(treatment._id)}
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
