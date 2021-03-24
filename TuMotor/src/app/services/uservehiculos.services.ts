import { Vehiculos } from '../models/vehiculos';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
  })
  export class UserVehiculos {
    VehiculoCollection: AngularFirestoreCollection<Vehiculos>;
    VehiculoDoc: AngularFirestoreDocument<Vehiculos>;
    Vehiculito: Observable<Vehiculos[]>;
    car: Observable<Vehiculos>;
    constructor( private afs: AngularFirestore) {
      this.VehiculoCollection = this.afs.collection<Vehiculos>('vehiculos', ref => ref);
    }
  
  
InitializeCollectionUid(uid?: string){
    if(uid){
      this.VehiculoCollection = this.afs.collection<Vehiculos>('vehiculos', ref => ref.where('uid', '==', uid));
    }
}

getvehiculos(uid?: string) {
  if(uid){
      this.VehiculoDoc = this.afs.doc<Vehiculos>(`vehiculo/${uid}`);
      this.car = this.VehiculoDoc.snapshotChanges().pipe(map(action => {
        if(action.payload.exists == false){
          return null;
        }else{
          const data = action.payload.data() as Vehiculos;
          data.usermail = action.payload.id;
          return data;
        }
      }));
      return this.car;
  }
}

save(car: Vehiculos){
  this.VehiculoCollection.doc(car.usermail).set(car);
}
}
