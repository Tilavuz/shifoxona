export interface StatisticsInterface {
  countDoctors: number;
  countPatsient: number;
  countRoom: number;
  doctors: string[];
  patsients: string[];
  summa: string;
}

export interface StatisticTreatmentInterface {
    days: string[],
    pricesByDay: number[]
}