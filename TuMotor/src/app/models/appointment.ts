export interface Appointment {
    uid?:string;
    UserUid:string;
    CarUid:string;
    Note?:string;
    date?: Date;
    status: string;
}
