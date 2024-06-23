import { PositionInterface } from "@/interface/position";
import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function UseGetPosition() {
  const [positions, sePositions] = useState<PositionInterface[]>([]);
  const [cookies] = useCookies()

  const getAllPositions = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}position`, {
        headers: {
          Authorization: `Bearer ${cookies?.token}`,
        },
      });
      sePositions(res.data);
    } catch (error) {
      console.error("Error fetching Positions:", error);
    }
  }, [cookies?.token]);

  return { positions, getAllPositions };
}
