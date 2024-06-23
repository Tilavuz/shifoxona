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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UseGetDepartment from "@/hooks/use-get-department";
import UseGetDoctor from "@/hooks/use-get-doctor";
import UseGetSpec from "@/hooks/use-get-spec";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Doctors() {
  const [spec, setSpec] = useState<string>();
  const [editDoctorId, setEditDoctorId] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [gender, setGender] = useState<number>(1);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const fPhoneRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const educationRef = useRef<HTMLInputElement>(null);
  const numberFRef = useRef<HTMLInputElement>(null);
  const worktimeRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const { getAllDepartment, departments } = UseGetDepartment();
  const [cookies] = useCookies();
  const { specs, getAllSpec } = UseGetSpec();
  const { doctors, getAllDoctors } = UseGetDoctor();

  useEffect(() => {
    getAllDoctors();
    getAllSpec();
    getAllDepartment();
  }, [getAllDoctors, getAllSpec, getAllDepartment]);

  const addDoctor = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const doctorData = {
        name: nameRef?.current?.value,
        phone: phoneRef?.current?.value,
        spec,
        department,
        gender,
        region: regionRef?.current?.value,
        district: districtRef?.current?.value,
        education: educationRef?.current?.value,
        family: numberFRef?.current?.value,
        worktime: worktimeRef?.current?.value,
        birthday: birthdayRef?.current?.value,
      };

      if (
        doctorData.name &&
        doctorData.birthday &&
        doctorData.phone &&
        doctorData.spec &&
        doctorData.department &&
        doctorData.gender &&
        doctorData.region &&
        doctorData.district &&
        doctorData.education &&
        doctorData.family &&
        doctorData.worktime
      ) {
        await axios.post(`${apiUrl}doctor`, doctorData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllDoctors();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editDoctor = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const doctorData = {
        _id: editDoctorId,
        name: nameRef?.current?.value,
        phone: phoneRef?.current?.value,
        spec,
        department,
        gender,
        region: regionRef?.current?.value,
        district: districtRef?.current?.value,
        education: educationRef?.current?.value,
        family: numberFRef?.current?.value,
        worktime: worktimeRef?.current?.value,
        birthday: birthdayRef?.current?.value,
      };

      if (
        doctorData.name &&
        doctorData.birthday &&
        doctorData.phone &&
        doctorData.spec &&
        doctorData.department &&
        doctorData.gender &&
        doctorData.region &&
        doctorData.district &&
        doctorData.education &&
        doctorData.family &&
        doctorData.worktime &&
        editDoctorId
      ) {
        await axios.put(`${apiUrl}doctor`, doctorData, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        getAllDoctors();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllDoctors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="container">
        <div className="flex items-center justify-between mt-8">
          <h2 className="font-bold text-xl">Doctors</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Doctor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add doctor</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => addDoctor(e)}
                className="flex flex-col gap-4"
              >
                <Input
                  ref={nameRef}
                  type="text"
                  placeholder="Full name"
                  required={true}
                />
                <div className="flex items-center gap-2">
                  <Input
                    ref={phoneRef}
                    type="text"
                    placeholder="Phone number"
                    required
                  />
                  <Input
                    ref={fPhoneRef}
                    type="text"
                    placeholder="Family phone number"
                    required
                  />
                </div>
                <Input
                  ref={regionRef}
                  type="text"
                  placeholder="Region"
                  required
                />
                <Input
                  ref={districtRef}
                  type="text"
                  placeholder="District"
                  required
                />
                <Input
                  ref={educationRef}
                  type="text"
                  placeholder="Education"
                  required
                />
                <div className="flex items-center gap-2">
                  <Input
                    ref={numberFRef}
                    type="number"
                    placeholder="Number of people in the family"
                    required
                  />
                  <Input
                    ref={worktimeRef}
                    type="number"
                    placeholder="Worktime"
                    required
                  />
                </div>
                <Input
                  ref={birthdayRef}
                  type="date"
                  placeholder="Birthday"
                  required
                />
                <div className="flex items-center gap-2">
                  <Select onValueChange={(e) => setSpec(e)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select spec" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {specs?.map((spec) => {
                          return (
                            <SelectItem key={spec._id} value={spec._id}>
                              {spec.title}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(e) => setDepartment(e)} required>
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
                </div>
                <RadioGroup
                  defaultValue={"1"}
                  onValueChange={(e) => setGender(parseInt(e, 10))}
                  required
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
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
              <th className="border border-black">Phone number</th>
              <th className="border border-black">Gender</th>
              <th className="border border-black">Family</th>
              <th className="border border-black">Worktime</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, i) => {
              return (
                <tr key={doctor._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Link to={doctor._id}>{doctor.name}</Link>
                  </td>
                  <td className="border py-2 border-black text-center">
                    {doctor.phone}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {doctor.gender === 1 ? "Male" : "Female"}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {doctor.family}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {doctor.worktime}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="mr-2"
                          variant={"outline"}
                          onClick={() => setEditDoctorId(doctor._id)}
                        >
                          <Pencil />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit doctor</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => editDoctor(e)}
                          className="flex flex-col gap-4"
                        >
                          <Input
                            ref={nameRef}
                            type="text"
                            placeholder="Full name"
                            required={true}
                            defaultValue={doctor.name}
                          />
                          <div className="flex items-center gap-2">
                            <Input
                              ref={phoneRef}
                              type="text"
                              placeholder="Phone number"
                              required
                              defaultValue={doctor.phone}
                            />
                            <Input
                              ref={fPhoneRef}
                              type="text"
                              placeholder="Family phone number"
                              required
                              defaultValue={doctor.familyphone}
                            />
                          </div>
                          <Input
                            ref={regionRef}
                            type="text"
                            placeholder="Region"
                            required
                            defaultValue={doctor.region}
                          />
                          <Input
                            ref={districtRef}
                            type="text"
                            placeholder="District"
                            required
                            defaultValue={doctor.district}
                          />
                          <Input
                            ref={educationRef}
                            type="text"
                            placeholder="Education"
                            required
                            defaultValue={doctor.education}
                          />
                          <div className="flex items-center gap-2">
                            <Input
                              ref={numberFRef}
                              type="number"
                              placeholder="Number of people in the family"
                              required
                              defaultValue={doctor.family}
                            />
                            <Input
                              ref={worktimeRef}
                              type="number"
                              placeholder="Worktime"
                              required
                              defaultValue={doctor.worktime}
                            />
                          </div>
                          <Input
                            ref={birthdayRef}
                            type="date"
                            placeholder="Birthday"
                            required
                          />
                          <div className="flex items-center gap-2">
                            <Select onValueChange={(e) => setSpec(e)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select spec" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {specs?.map((spec) => {
                                    return (
                                      <SelectItem
                                        key={spec._id}
                                        value={spec._id}
                                      >
                                        {spec.title}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <Select
                              onValueChange={(e) => setDepartment(e)}
                              required
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
                          </div>
                          <RadioGroup
                            defaultValue={"1"}
                            onValueChange={(e) => setGender(parseInt(e, 10))}
                            required
                            className="flex"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
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
                            onClick={() => deleteDoctor(doctor._id)}
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
