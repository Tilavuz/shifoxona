import { DoctorInterface } from "./doctor";
import { PatsientInterface } from "./patsient";

export interface HistoryPatsientInterface {
    _id: string;
    patsient: PatsientInterface | string;
    doctor: DoctorInterface | string;
    diagnosType: string;
    diagnos: string;
    date: string;
}