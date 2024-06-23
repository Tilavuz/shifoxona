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
import UseGetPatsient from "@/hooks/use-get-patsient";
import axios from "axios";
import { MoveLeft, MoveRight, Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Patsients() {
  const { getAllDepartment, departments } = UseGetDepartment();
  const [cookies] = useCookies();
  const { patsients, getAllPatsients } = UseGetPatsient();
  const { getAllDoctors, doctors } = UseGetDoctor();

  const [doctor, setDoctor] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [formTranslate, setFormTranslate] = useState<boolean>(false);
  const [gender, setGender] = useState<number>(1);
  const [married, setMarried] = useState<number>(1);
  const [busy, setBusy] = useState<number>(1);

  const nameRef = useRef<HTMLInputElement>(null);
  const privilegeRef = useRef<HTMLInputElement>(null);
  const privilegeDocRef = useRef<HTMLInputElement>(null);
  const privilegeDateRef = useRef<HTMLInputElement>(null);
  const policyRef = useRef<HTMLInputElement>(null);
  const policyCompanyRef = useRef<HTMLInputElement>(null);
  const workplaceRef = useRef<HTMLInputElement>(null);
  const diagnosRef = useRef<HTMLInputElement>(null);
  const arriveDateRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const fPhoneRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const districtRef = useRef<HTMLInputElement>(null);
  const educationRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const bloodtypeRef = useRef<HTMLInputElement>(null);
  const invalidRef = useRef<HTMLInputElement>(null);
  const factorRef = useRef<HTMLInputElement>(null);
  const reactionsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllPatsients();
    getAllDepartment();
    getAllDoctors();
  }, [getAllPatsients, getAllDepartment, getAllDoctors]);

  const addPatsient = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const patsientData = {
        name: nameRef?.current?.value,
        phone: phoneRef?.current?.value,
        department,
        doctor,
        arriveDate: arriveDateRef?.current?.value,
        diagnos: diagnosRef?.current?.value,
        birthday: birthdayRef?.current?.value,
        gender,
        married,
        region: regionRef?.current?.value,
        district: districtRef?.current?.value,
        education: educationRef?.current?.value,
        employment: busy,
        workplace: workplaceRef?.current?.value,
        familyphone: fPhoneRef?.current?.value,
        bloodtype: bloodtypeRef?.current?.value,
        factor: factorRef?.current?.value,
        policy: policyRef?.current?.value,
        policecompany: policyCompanyRef?.current?.value,
        privilege: privilegeRef?.current?.value,
        privilegeDoc: privilegeDocRef?.current?.value,
        privilegeDate: privilegeDateRef?.current?.value,
        invalid: invalidRef?.current?.value,
        weight: weightRef?.current?.value,
        height: heightRef?.current?.value,
        reactions: reactionsRef?.current?.value,
      };

      await axios.post(`${apiUrl}patsient`, patsientData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllPatsients();
    } catch (err) {
      console.log(err);
    }
  };

  const editPatsient = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const patsientData = {
        name: nameRef?.current?.value,
        phone: phoneRef?.current?.value,
        department,
        doctor,
        arriveDate: arriveDateRef?.current?.value,
        diagnos: diagnosRef?.current?.value,
        birthday: birthdayRef?.current?.value,
        gender,
        married,
        region: regionRef?.current?.value,
        district: districtRef?.current?.value,
        education: educationRef?.current?.value,
        employment: busy,
        workplace: workplaceRef?.current?.value,
        familyphone: fPhoneRef?.current?.value,
        bloodtype: bloodtypeRef?.current?.value,
        factor: factorRef?.current?.value,
        policy: policyRef?.current?.value,
        policecompany: policyCompanyRef?.current?.value,
        privilege: privilegeRef?.current?.value,
        privilegeDoc: privilegeDocRef?.current?.value,
        privilegeDate: privilegeDateRef?.current?.value,
        invalid: invalidRef?.current?.value,
        weight: weightRef?.current?.value,
        height: heightRef?.current?.value,
        reactions: reactionsRef?.current?.value,
      };

      await axios.put(`${apiUrl}patsient`, patsientData, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllPatsients();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePatsient = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}patsient/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      getAllPatsients();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="px-8">
        <div className="flex items-center justify-between mt-8 container">
          <h2 className="font-bold text-xl">Patsients</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Patsient
              </Button>
            </DialogTrigger>
            <DialogContent className=" overflow-x-hidden">
              <DialogHeader>
                <DialogTitle>Add Patsient</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => addPatsient(e)}
                className={`flex gap-4 w-[955px] items-start justify-between transition-all ${
                  formTranslate ? "translate-x-[-495px]" : ""
                }`}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <Input
                    ref={nameRef}
                    type="text"
                    placeholder="Full name"
                    required={true}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      ref={privilegeRef}
                      type="text"
                      placeholder="Privilege"
                    />
                    <Input
                      ref={privilegeDocRef}
                      type="text"
                      placeholder="Privilege doc"
                    />
                  </div>
                  <Label className="font-bold text-base">
                    Privilege date
                    <Input
                      ref={privilegeDateRef}
                      type="date"
                      placeholder="Privilege date"
                    />
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input ref={policyRef} type="text" placeholder="Policy" />
                    <Input
                      ref={policyCompanyRef}
                      type="text"
                      placeholder="Police company"
                    />
                  </div>
                  <Input
                    ref={workplaceRef}
                    type="text"
                    placeholder="Workplace"
                  />
                  <Input ref={diagnosRef} type="text" placeholder="Diagnos" />
                  <Label className="font-bold text-base">
                    Arrive date
                    <Input
                      ref={arriveDateRef}
                      type="date"
                      required
                      placeholder="Arrive date"
                    />
                  </Label>
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
                  <Button onClick={() => setFormTranslate(true)} type="button">
                    <MoveRight size={32} />
                  </Button>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
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
                  </div>
                  <Input
                    ref={educationRef}
                    type="text"
                    placeholder="Education"
                    required
                  />
                  <Label className="font-bold text-base">
                    Birthday
                    <Input
                      ref={birthdayRef}
                      type="date"
                      placeholder="Birthday"
                      required
                    />
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input ref={weightRef} type="number" placeholder="weight" />
                    <Input ref={heightRef} type="number" placeholder="height" />
                    <Input
                      ref={bloodtypeRef}
                      type="number"
                      placeholder="bloodtype"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      ref={invalidRef}
                      type="number"
                      placeholder="Invalid number"
                    />
                    <Input ref={factorRef} type="text" placeholder="Factor" />
                  </div>
                  <Input
                    ref={reactionsRef}
                    type="text"
                    placeholder="reactions"
                  />
                  <div className="flex items-center gap-2">
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
                    <Select onValueChange={(e) => setDoctor(e)} required>
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
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col gap-2">
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
                      <RadioGroup
                        defaultValue={"1"}
                        onValueChange={(e) => setMarried(parseInt(e, 10))}
                        required
                        className="flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="married" />
                          <Label htmlFor="married">Married</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="not-married" />
                          <Label htmlFor="not-married">Not married</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="flex flex-col gap-2">
                      <RadioGroup
                        defaultValue={"1"}
                        onValueChange={(e) => setBusy(parseInt(e, 10))}
                        required
                        className="flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="busy" />
                          <Label htmlFor="busy">Busy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="not-busy" />
                          <Label htmlFor="not-busy">Not busy</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setFormTranslate(false)}
                      variant={"outline"}
                      type="button"
                    >
                      <MoveLeft size={32} />
                    </Button>
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </div>
                </div>
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
              <th className="border border-black">Departmant</th>
              <th className="border border-black">Doctor</th>
              <th className="border border-black">Arrive date</th>
              <th className="border border-black">Diagnos</th>
              <th className="border border-black">Gender</th>
              <th className="border border-black w-36">Change</th>
            </tr>
          </thead>
          <tbody>
            {patsients?.map((patsient, i) => {
              return (
                <tr key={patsient._id}>
                  <td className="border py-2 border-black text-center">
                    {i + 1}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Link to={patsient._id}>{patsient.name}</Link>
                  </td>
                  <td className="border py-2 border-black text-center">
                    {patsient.phone}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {patsient.department}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {patsient.doctor}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {patsient.arriveDate}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {patsient.diagnos}
                  </td>
                  <td className="border py-2 border-black text-center">
                    {patsient.gender === 1 ? "Male" : "Female"}
                  </td>
                  <td className="border py-2 border-black text-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="mr-2" variant={"outline"}>
                          <Pencil />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="overflow-x-hidden">
                        <DialogHeader>
                          <DialogTitle>Edit Patsient</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => editPatsient(e)}
                          className={`flex gap-4 w-[955px] items-start justify-between transition-all ${
                            formTranslate ? "translate-x-[-495px]" : ""
                          }`}
                        >
                          <div className="flex flex-col gap-2 flex-1">
                            <Input
                              ref={nameRef}
                              type="text"
                              placeholder="Full name"
                              required={true}
                              defaultValue={patsient.name}
                            />
                            <div className="flex items-center gap-2">
                              <Input
                                ref={privilegeRef}
                                type="text"
                                placeholder="Privilege"
                                defaultValue={patsient.privilege}
                              />
                              <Input
                                ref={privilegeDocRef}
                                type="text"
                                placeholder="Privilege doc"
                                defaultValue={patsient.privilegeDoc}
                              />
                            </div>
                            <Label className="font-bold text-base">
                              Privilege date
                              <Input
                                ref={privilegeDateRef}
                                type="date"
                                placeholder="Privilege date"
                              />
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                ref={policyRef}
                                type="text"
                                placeholder="Policy"
                                defaultValue={patsient.policy}
                              />
                              <Input
                                ref={policyCompanyRef}
                                type="text"
                                placeholder="Police company"
                                defaultValue={patsient.policecompany}
                              />
                            </div>
                            <Input
                              ref={workplaceRef}
                              type="text"
                              placeholder="Workplace"
                              defaultValue={patsient.workplace}
                            />
                            <Input
                              ref={diagnosRef}
                              type="text"
                              placeholder="Diagnos"
                              defaultValue={patsient.diagnos}
                            />
                            <Label className="font-bold text-base">
                              Arrive date
                              <Input
                                ref={arriveDateRef}
                                type="date"
                                required
                                placeholder="Arrive date"
                              />
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                ref={phoneRef}
                                type="text"
                                placeholder="Phone number"
                                required
                                defaultValue={patsient.phone}
                              />
                              <Input
                                ref={fPhoneRef}
                                type="text"
                                placeholder="Family phone number"
                                required
                                defaultValue={patsient.familyphone}
                              />
                            </div>
                            <Button
                              onClick={() => setFormTranslate(true)}
                              type="button"
                            >
                              <MoveRight size={32} />
                            </Button>
                          </div>
                          <div className="flex flex-col gap-3 flex-1">
                            <div className="flex items-center gap-2">
                              <Input
                                ref={regionRef}
                                type="text"
                                placeholder="Region"
                                required
                                defaultValue={patsient.region}
                              />
                              <Input
                                ref={districtRef}
                                type="text"
                                placeholder="District"
                                required
                                defaultValue={patsient.district}
                              />
                            </div>
                            <Input
                              ref={educationRef}
                              type="text"
                              placeholder="Education"
                              required
                              defaultValue={patsient.education}
                            />
                            <Label className="font-bold text-base">
                              Birthday
                              <Input
                                ref={birthdayRef}
                                type="date"
                                placeholder="Birthday"
                                required
                              />
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                ref={weightRef}
                                type="number"
                                placeholder="weight"
                                defaultValue={patsient.weight}
                              />
                              <Input
                                ref={heightRef}
                                type="number"
                                placeholder="height"
                                defaultValue={patsient.height}
                              />
                              <Input
                                ref={bloodtypeRef}
                                type="number"
                                placeholder="bloodtype"
                                defaultValue={patsient.bloodtype}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                ref={invalidRef}
                                type="number"
                                placeholder="Invalid number"
                                defaultValue={patsient.invalid}
                              />
                              <Input
                                ref={factorRef}
                                type="text"
                                placeholder="Factor"
                                defaultValue={patsient.factor}
                              />
                            </div>
                            <Input
                              ref={reactionsRef}
                              type="text"
                              placeholder="reactions"
                              defaultValue={patsient.reactions}
                            />
                            <div className="flex items-center gap-2">
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
                              <Select
                                onValueChange={(e) => setDoctor(e)}
                                required
                              >
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
                            <div className="flex items-start gap-6">
                              <div className="flex flex-col gap-2">
                                <RadioGroup
                                  defaultValue={"1"}
                                  onValueChange={(e) =>
                                    setGender(parseInt(e, 10))
                                  }
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
                                <RadioGroup
                                  defaultValue={"1"}
                                  onValueChange={(e) =>
                                    setMarried(parseInt(e, 10))
                                  }
                                  required
                                  className="flex"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="1" id="married" />
                                    <Label htmlFor="married">Married</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="2"
                                      id="not-married"
                                    />
                                    <Label htmlFor="not-married">
                                      Not married
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>
                              <div className="flex flex-col gap-2">
                                <RadioGroup
                                  defaultValue={"1"}
                                  onValueChange={(e) =>
                                    setBusy(parseInt(e, 10))
                                  }
                                  required
                                  className="flex"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="1" id="busy" />
                                    <Label htmlFor="busy">Busy</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="2" id="not-busy" />
                                    <Label htmlFor="not-busy">Not busy</Label>
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => setFormTranslate(false)}
                                variant={"outline"}
                                type="button"
                              >
                                <MoveLeft size={32} />
                              </Button>
                              <Button type="submit" className="w-full">
                                Submit
                              </Button>
                            </div>
                          </div>
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
                            onClick={() => deletePatsient(patsient._id)}
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
