import { DoctorInterface } from "@/interface/doctor";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UseGetDoctor() {
  const [doctors, seDoctors] = useState<DoctorInterface[]>([]);
  const [cookies] = useCookies()

  const getAllDoctors = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}doctor`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      seDoctors(res.data);
    } catch (error) {
      console.error("Error fetching Doctors:", error);
    }
  }, [cookies?.token]);

  return { doctors, getAllDoctors };
}
