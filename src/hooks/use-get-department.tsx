import { DepartmentInterface } from "@/interface/department";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UseGetDepartment() {
  const [departments, seDepartments] = useState<DepartmentInterface[]>([]);
  const [cookies] = useCookies();

  const getAllDepartment = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}department`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      seDepartments(res.data);
    } catch (error) {
      console.error("Error fetching Departments:", error);
    }
  }, [cookies?.token]);

  return { departments, getAllDepartment };
}
