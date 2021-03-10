import { Injectable, NgZone } from '@angular/core';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { LoginComponent } from '../components/login/login.component';


export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
    userState: any;

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
    }
  
    SignIn(email, password) {
      console.log("sign");
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['userhome']);
            document.getElementById('modalclosebutton').click();
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }
    
  
    SignUp(email, password) {
      console.log("sign");
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
          document.getElementById('modalclosebutton').click();
          this.router.navigate(['userhome']);
          
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
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

    get userdata(): JSON{
      const user = JSON.parse(localStorage.getItem('user'));
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
            this.router.navigate(['userhome']);
            
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    SignOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['home']);
      })
    }  

    public emailAndPassword(email, password)
    {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    public googleLogin() 
  {
    var provider = new firebase.auth.GoogleAuthProvider();

    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) 
  {
    return this.afAuth.signInWithPopup(provider).then(credentials => {
      const user = credentials.user;
      this.afs.collection<User>('users', ref => ref.where('email', '==', user.email)).snapshotChanges()
      .subscribe(data => {
        if(!data.length)
        {
          const newUser = 
          {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoUrl: user.photoURL,
            role: 'customer'
          }
          this.afs.collection('users').doc(user.uid).set(newUser).then(() => {
            this.router.navigate(['/home'])
            return;
          })
        }
      })
      this.router.navigate(['/home']);
    })
  }
  
  
}