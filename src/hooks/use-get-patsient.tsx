import { PatsientInterface } from "@/interface/patsient";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UseGetpatsient() {
  const [patsients, setPatsients] = useState<PatsientInterface[]>([]);
  const [cookies] = useCookies()

  const getAllPatsients = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}patsient`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      setPatsients(res.data);
    } catch (error) {
      console.error("Error fetching patsients:", error);
    }
  }, [cookies?.token]);

  return { patsients, getAllPatsients };
}
