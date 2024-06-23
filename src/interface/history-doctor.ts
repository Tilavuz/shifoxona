import { DoctorInterface } from "./doctor";

export interface HistoryDoctorInterface {
    _id: string;
    doctor: DoctorInterface | string;
    position: string;
    title: string;
    startDate: string;
    endDate: string;
}