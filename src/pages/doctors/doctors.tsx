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
import UseGetSpec from "@/hooks/use-get-spec";
import { DoctorInterface } from "@/interface/doctor";
import axios from "axios";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Doctors() {
  const [doctors, setDoctors] = useState<DoctorInterface[] | null>(null);
  const [spec, setSpec] = useState<string>();
  const [gender, setGender] = useState<number>(1)
  const { getAllDepartment, departments } = UseGetDepartment();
  const [cookies] = useCookies();
  const { specs, getAllSpec } = UseGetSpec();

  const getAllDoctors = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}doctor`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [cookies?.token]);

  useEffect(() => {
    getAllDoctors();
    getAllSpec();
    getAllDepartment();
  }, [getAllDoctors, getAllSpec, getAllDepartment]);

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
              <form className="flex flex-col gap-4">
                <Input type="text" placeholder="Full name" required />
                <Input type="text" placeholder="Phone number" required/>
                <Input type="text" placeholder="Family phone number" required/>
                <Input type="text" placeholder="Region" required/>
                <Input type="text" placeholder="District" required/>
                <Input type="text" placeholder="Education" required/>
                <Input type="number" placeholder="Number of people in the family" required/>
                <Input type="number" placeholder="Worktime" required/>
                <Input type="date" placeholder="Birthday" required/>
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
                <Select onValueChange={(e) => setSpec(e)} required>
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
                <RadioGroup defaultValue={"1"} onValueChange={(e) => setGender(parseInt(e, 10))} required>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="male"/>
                        <Label htmlFor="male">Male</Label> 
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="female"/>
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
      </div>
    </div>
  );
}
