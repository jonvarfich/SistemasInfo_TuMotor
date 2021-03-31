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

//https://stackoverflow.com/questions/49002735/how-to-add-collection-within-document-angularfire2-angular5


@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
    userState: any;
    firestore: any;
    public user = new Observable<User>();

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })

      let userDoc = this.afs.doc<User>('User/'+this.userdata.uid);
      this.user = userDoc.valueChanges();

    }
  
    SignIn(email, password) {
      console.log("sign");
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            
            document.getElementById('modalclosebutton').click();
          });
          this.SetUserData(result.user);
          this.router.navigate(['userhome']);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  
    SignUp(email, password) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          //this.SendVerificationMail();
          this.SetUserData(result.user);
          document.getElementById('modalclosebutton').click();
          this.redirectTo('userhome'); 
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['email-verification']);
        })
    }    
  
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null) ? true : false;
    }

    get userdata(): User{
      const user: User = JSON.parse(localStorage.getItem('user'));
      return user;
    }
  
    GoogleAuth() {
      return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    }
  
    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run(() => {
            document.getElementById('modalclosebutton').click();
          })
        this.SetUserData(result.user);
        this.redirectTo('userhome');
      }).catch((error) => {
        window.alert(error)
      })
    }

/*     SetUserVehicleCollection(){

      const vehicleRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.LoggedUser.uid}`);
      const userVehicle: Vehicle = {
        uid: this.LoggedUser.uid,
      }

      this.afs.collection(`users/${this.LoggedUser.uid}/vehicles`).add(userVehicle);

    } */
  
    SetUserData(user) {

      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.redirectTo('/home');
      })
    }  

   redirectTo(uri:string){

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
      
  }

}