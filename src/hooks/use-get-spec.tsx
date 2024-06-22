import { SpecInterface } from "@/interface/spec";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UseGetSpec() {
  const [specs, seSpecs] = useState<SpecInterface[]>([]);
  const [cookies] = useCookies()

  const getAllSpec = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}spec`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      seSpecs(res.data);
    } catch (error) {
      console.error("Error fetching specs:", error);
    }
  }, [cookies?.token]);

  return { specs, getAllSpec };
}
