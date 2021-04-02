import { Component, Input, OnInit } from '@angular/core';
import { data, map } from 'jquery';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import {Repairorder} from 'src/app/models/repairorder';
import { MechanicService } from 'src/app/services/mechanic.service';

@Component({
  selector: 'app-manage-appointment',
  templateUrl: './manage-appointment.component.html',
  styleUrls: ['./manage-appointment.component.scss']
})
export class ManageAppointmentComponent implements OnInit {

  @Input() appointmentuid:string;

  public appointment: Appointment;
  public repairOrder: Repairorder;
  public user: User;
  public userid: string;
  public vehicleid: string;
  public vehicle: Vehicle;
  public Orders: Array<Repairorder> = [];
  

  constructor(
    private mechanic:MechanicService,
  ) {

  }

  ngOnInit(): void {

    this.getAppointment(this.appointmentuid);
    this.mechanic.getallOrders().subscribe((order) => this.Orders = order);

  }



//Función salva patria
  getDocFieldValue(uid){
    this.mechanic.afs.doc<Appointment>(`appointments/${uid}`).get().subscribe(ref => {
    if(!ref.exists){
    console.log("none")// //DOC DOES NOT EXIST
    }else{
    const doc = ref.data();
    this.userid = doc.UserUid;
    this.vehicleid = doc.CarUid;
    //console.log(this.userid);
    }
    });
  }

/*   getUser(uid){
    this.mechanic.afs.doc<User>(`users/${uid}`).get().subscribe(ref => {
    if(!ref.exists){
    console.log("none")// //DOC DOES NOT EXIST
    }else{
      const doc = ref.data();
      this.userid = ref.data().uid;
    }
    });
  } */

  getAppointment(uid){
    this.mechanic.afs.doc<Appointment>(`appointments/${uid}`).get().subscribe(ref => {
    if(!ref.exists){
    console.log("none")// //DOC DOES NOT EXIST
    }else{
    const doc: Appointment = ref.data();
    this.appointment= doc;
    this.userid = doc.UserUid;
    this.getUser(this.userid,doc.CarUid);
    //console.log(this.userid);
    //console.log(doc); //LOG ENTIRE DOC
    //console.log("holaa"+this.userid);
    }
    });
    }

    
    getVehicle(uid:string,vid:string){
      //console.log(vid);
      this.mechanic.afs.doc<Vehicle>(`users/${uid}/vehicles/${vid}`).get().subscribe(ref => {
      if(!ref.exists){
      console.log("none")// //DOC DOES NOT EXIST
      }else{
      const doc: Vehicle = ref.data();
      this.vehicle= doc;
      //console.log(this.vehicle);
      }
      });
      }

    getUser(uid:string, vid:string){
      //console.log(uid);
      this.mechanic.afs.doc<User>(`users/${uid}`).get().subscribe(ref => {
      if(!ref.exists){
      console.log("none")// //DOC DOES NOT EXIST
      }else{
      const doc: User = ref.data();
      this.user= doc;
      this.getVehicle(this.user.uid,vid);
      }
      });
      }

      print(){
        console.log(this.userid);
      }

      setRepairOrder(bt:string, keys:string, cat:string, player:string,tools:string,gas:number,note:string){
        let aux: Repairorder ={
          Completed: false,
          BackupTire: this.isTrue(bt),
          Keys: this.isTrue(keys),
          Cat: this.isTrue(cat),
          Player: this.isTrue(player),
          Tools: this.isTrue(tools),
          Gas: gas,
          Note: note,
          Appointmentuid: this.appointmentuid,
        }
        this.mechanic.afs.collection('repairOrders').add(aux);
      }

      isTrue(i:string):boolean{
        if(i == "1"){return true}
        else{return false}
      }


}
