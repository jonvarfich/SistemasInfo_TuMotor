import { Injectable, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore'
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { LoginComponent } from '../components/login/login.component';
import { Vehicle } from '../models/vehicle';
import { User } from '../models/user';
import { NgAuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SuperuserService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public ngAuthService: NgAuthService,
  ) { }

  makeadmin(privilege: number){
    const firestore = AngularFirestore

    const UserRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.ngAuthService.userdata.uid}`);

    UserRef.update({admin: privilege}).then(() => console.log('success'+privilege)).catch(err => console.error(err));

  }

}
