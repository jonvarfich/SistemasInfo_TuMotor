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

//https://stackoverflow.com/questions/49002735/how-to-add-collection-within-document-angularfire2-angular5
//https://stackoverflow.com/questions/48541270/how-to-add-document-with-custom-id-to-firestore


@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  userState: any;
  LoggedUser: User;
  firestore: any;
  private UserTable: AngularFirestoreDocument;
  private VehicleCollection:AngularFirestoreCollection<Vehicle>;

  constructor(
    public afs: AngularFirestore,
    public Deposit: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public ngAuthService: NgAuthService,
  ) {
    this.UserTable = this.afs.collection('users').doc(this.ngAuthService.userdata.uid);
    this.VehicleCollection = this.UserTable.collection<Vehicle>('vehicles');
  }

  
  getallvehicles(): Observable<Vehicle[]>{
    return this.VehicleCollection.snapshotChanges().pipe(
      map((Vehicles) =>
  
        {
          return Vehicles.map((Vehicle)=>(
            {
              uid: Vehicle.payload.doc.id,
              ...Vehicle.payload.doc.data(),
            }
          )
          )
        }
      ));
  }

  DisableVehicle(Vuid: string){
    this.afs.collection('users').doc(this.ngAuthService.userdata.uid).collection('vehicles').doc(Vuid).update({'status': false});
  }
  
  addvehicle(name:string, brand:string, color:string,placa:string,year:number,serial:string,foto:string){

      this.LoggedUser = this.ngAuthService.userdata;
      let Datenow = new Date(Date.now());
      const vehicleRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.LoggedUser.uid}`);
      const userVehicle: Vehicle = {
        name: name,
        marca: brand,
        color: color,
        placa: placa,
        status: true,
        year:year,
        serial:serial,
        foto:foto,
        DateRegistry: Datenow,
      }

      this.afs.collection(`users/${this.LoggedUser.uid}/vehicles`).add(userVehicle);
    }

  userUpdate(name: string){
    this.ngAuthService.userdata.displayName = name;
    this.afs.collection(`users`).doc(this.ngAuthService.userdata.uid).update({'displayName': name});
  }
    

}