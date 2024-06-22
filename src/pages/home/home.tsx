import {
  StatisticTreatmentInterface,
  StatisticsInterface,
} from "@/interface/statistics";
import axios from "axios";
import {
  CircleDollarSign,
  ContactRound,
  GraduationCap,
  Hospital,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useCookies } from "react-cookie";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function Home() {
  const [cookies] = useCookies();
  const [statistics, setStatistics] = useState<StatisticsInterface>();
  const [statisticTreatmentData, setStatisticTreatment] = useState<StatisticTreatmentInterface>();
  
  useEffect(() => {
    const getStatistics = async () => {
      try {
        const statisticTreatment = await axios.get(
          `${apiUrl}statistic/treatment`,
          {
            headers: {
              Authorization: `Bearer ${cookies?.token}`,
            },
          }
        );
        setStatisticTreatment(statisticTreatment.data);

        const res = await axios.get(`${apiUrl}statistic`, {
          headers: {
            Authorization: `Bearer ${cookies?.token}`,
          },
        });
        setStatistics(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getStatistics();
  }, [cookies?.token]);

  return (
    <div>
      <div className="container">
        <div className="pt-12">
          <div className="flex items-start gap-4 justify-between">
            <div className="border shadow-inner flex items-center max-w-[320px] h-[150px] p-8 gap-8">
              <div>
                <p className="font-bold text-xl">Number of doctors</p>
                <p className="font-bold">{statistics?.countDoctors}</p>
              </div>
              <GraduationCap size={32} />
            </div>
            <div className="border shadow-inner flex items-center max-w-[320px] h-[150px] p-8 gap-8">
              <div>
                <p className="font-bold text-xl">Number of patients</p>
                <p className="font-bold">{statistics?.countPatsient}</p>
              </div>
              <ContactRound size={32} />
            </div>
            <div className="border shadow-inner flex items-center max-w-[320px] h-[150px] p-8 gap-8">
              <div>
                <p className="font-bold text-xl">Number of rooms</p>
                <p className="font-bold">{statistics?.countRoom}</p>
              </div>
              <Hospital size={32} />
            </div>
            <div className="border shadow-inner flex items-center max-w-[320px] h-[150px] p-8 gap-8">
              <div>
                <p className="font-bold text-xl">Our general fund</p>
                <p className="font-bold">{statistics?.summa}</p>
              </div>
              <CircleDollarSign size={32} />
            </div>
          </div>
          <div>
            {statisticTreatmentData && (
              <BarChart
                xAxis={[
                  { scaleType: "band", data: statisticTreatmentData?.days },
                ]}
                series={[{ data: statisticTreatmentData?.pricesByDay }]}
                height={500}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
