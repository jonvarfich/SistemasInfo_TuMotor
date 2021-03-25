import { Injectable, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { LoginComponent } from '../components/login/login.component';
import { Vehicle } from '../models/vehicle';
import { User } from '../models/user';
import { NgAuthService } from './auth.service';

//https://stackoverflow.com/questions/49002735/how-to-add-collection-within-document-angularfire2-angular5
//https://stackoverflow.com/questions/48541270/how-to-add-document-with-custom-id-to-firestore


@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  userState: any;
  LoggedUser: User;
  firestore: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public ngAuthService: NgAuthService,
  ) {}
  
  addvehicle(){


      this.LoggedUser = this.ngAuthService.userdata;
      const vehicleRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.LoggedUser.uid}`);
      const userVehicle: Vehicle = {
        uid: 'hola',
      }

      this.afs.collection(`users/${this.LoggedUser.uid}/vehicles`).add(userVehicle);

      
    }
    



}
