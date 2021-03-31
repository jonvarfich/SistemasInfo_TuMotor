import { Injectable, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import { map, timestamp } from 'rxjs/Operators';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { LoginComponent } from '../components/login/login.component';
import { Vehicle } from '../models/vehicle';
import { User } from '../models/user';
import { NgAuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  userState: any;
  LoggedUser: User;
  firestore: any;
  private UserTable:AngularFirestoreCollection<User>;
  private AppointmentCollection:AngularFirestoreCollection<Appointment>;

  constructor(private ngAuthService:NgAuthService,
    public afs: AngularFirestore,
    public Deposit: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    ) {
    this.UserTable = this.afs.collection<User>('users');
    this.AppointmentCollection = this.afs.collection<Appointment>('appointments');
  }

  getallAppointments(): Observable<Appointment[]>{
    return this.AppointmentCollection.snapshotChanges().pipe(
      map((Appointments) =>
        {
          return Appointments.map((Appointment)=>(
            {
              uid: Appointment.payload.doc.id,
              ...Appointment.payload.doc.data(),
            }
          )
          )
        }
      ));
  }


  getallUsers(): Observable<User[]>{
    return this.UserTable.snapshotChanges().pipe(
      map((Users) =>
  
        {
          return Users.map((User)=>(
            {
              uid: User.payload.doc.id,
              ...User.payload.doc.data(),
            }
          )
          )
        }
      ));
  }

}
