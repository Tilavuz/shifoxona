import { ServiceInterface } from "@/interface/service";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UseGetService() {
  const [services, seServices] = useState<ServiceInterface[]>([]);
  const [cookies] = useCookies()

  const getAllService = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}service`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      seServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [cookies?.token]);

  return { services, getAllService };
}
