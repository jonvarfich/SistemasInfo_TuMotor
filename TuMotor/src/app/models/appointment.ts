export interface Appointment {
    uid?:string;
    UserUid?:string;
    CarUid?:string;
    Note?:string;
    date?: Date;
    status?: string;

    Completed?: string,
    BackupTire?: boolean,
    Keys?: boolean,
    Cat?: boolean,
    Player?: boolean,
    Tools?: boolean,
    Gas?: number,
    Process?:string,
    Fixes?:string,
    Diagnostic?:string,

    mechanic?:string,
}
