import { Injectable, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import { map, tap, timestamp } from 'rxjs/Operators';
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
export class MechanicService {



  constructor(
    public afs: AngularFirestore,
    public Deposit: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public ngAuthService: NgAuthService,
  ) { }

  getAppointment(Aid:string): Observable<Appointment>{
    return this.afs.collection<Appointment>('appointments').doc(Aid).snapshotChanges().pipe(
      map((Appointment) =>
        {
          const data = Appointment.payload.data();
          const id = Appointment.payload.id;
          return{id,...data}
        }
      ));
  }


  getUser(id: string): Observable<User> {
    const productsDocuments = this.afs.doc<User>('users/' + id);
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  getVehicle(uid:string, id: string): Observable<Vehicle> {
    const productsDocuments = this.afs.doc<Vehicle>('users/' + uid + '/vehicles/'+id);
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data();
          const id = changes.payload.id;
          return { id, ...data };
        }))
  }

  
}
