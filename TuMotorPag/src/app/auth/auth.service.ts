import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Firebase:
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import firebase from 'firebase/app';

//Modelos:
import { User } from "../models/user";

//Observables:
import {switchMap} from 'rxjs/operators';
import { Observable , of} from 'rxjs';


@Injectable()
export class AuthService {
  
  User: Observable<User>;
  
  constructor (
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) 
  {
    //Comprobante de user correctamente iniciado:
    this.User = this.afAuth.authState.pipe(switchMap(User => 
    {
      //Usuario conectado:
      if( User )
      {
        return this.firestore.doc<User>(`users/${User.uid}`).valueChanges();
      }
      //Usuario desconectado:
      else 
      {
        return of(null);
      }
    }))
  }

  //inicio de sesión con Google:
  public googleLogin() 
  {
    var provider = new firebase.auth.GoogleAuthProvider();

    return this.oAuthLogin(provider);
  }

  //iniciar sesión y guardar la información del usuario (Google):
  private oAuthLogin(provider) 
  {
    return this.afAuth.signInWithPopup(provider).then(credentials => {
      const user = credentials.user;
      this.firestore.collection<User>('users', ref => ref.where('email', '==', user.email)).snapshotChanges()
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
          this.firestore.collection('users').doc(user.uid).set(newUser).then(() => {
            this.router.navigate(['/home'])
            return;
          })
        }
      })
      this.router.navigate(['/home']);
    })
  }
  
  //actualizar informacion del user:
  public updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    if(user.photoUrl == null){
      if(user.role == "customer"){
        console.log("photoNula")
        const data: User = {
          uid: user.uid,
          email: user.email,
          name: user.name,
          role: "customer"
        }
        return userRef.set(data);
      }else{
        const data: User = {
          uid: user.uid,
          email: user.email,
          name: user.name,
          role: "admin"
        }
        return userRef.set(data);
      }
    }else{
      if(user.role == "customer"){
        console.log("photoNoNulala")
        const data: User = {
          uid: user.uid,
          email: user.email,
          name: user.name,
          role: "customer"
      }
      return userRef.set(data);
    }else {
      const data: User = {
        uid: user.uid,
        email: user.email,
        name: user.name,
        role: "admin"
      }
      return userRef.set(data);
    }
  }
  }
  //iniciar sesion mediante mail y password:
  public emailAndPassword(email, password)
  {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  //Registro usuario:
  public signUp(email, password)
  {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  //Cerrar sesion:
  public signOut() 
  {
    this.afAuth.signOut().then(() => 
    this.router.navigate(['/login']));
  }

  //Contraseña olvidada / recuperar
  public ForgotPassword(email)
  {
    this.afAuth.sendPasswordResetEmail(email).then(function() {
      alert("email sent")
    }).catch(function(error) {
      alert(error.message);
    });
  }
}