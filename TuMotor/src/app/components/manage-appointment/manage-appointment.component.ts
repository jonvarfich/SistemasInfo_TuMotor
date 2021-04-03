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
    this.appointment.uid = ref.id;
    console.log("ESTE ES EL ID:::",this.appointment.uid);
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
      console.log(this.vehicle);
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

      setRepairOrder(bt:string, keys:string, cat:string, player:string,tools:string,gas:number){

        console.log(this.appointmentuid);
        console.log(this.appointment);

        this.appointment.Completed = "standby";
        this.appointment.BackupTire = this.isTrue(bt);
        this.appointment.Keys = this.isTrue(keys);
        this.appointment.Cat = this.isTrue(cat);
        this.appointment.Player = this.isTrue(player);
        this.appointment.Tools = this.isTrue(tools),
        this.appointment.Gas = gas;

        this.mechanic.afs.collection<Appointment>('appointments').doc<Appointment>(this.appointmentuid).update(
          {
            'Completed': "standby",
            'BackupTire': true,
            'Keys': true,
            'Cat': true,
            'Player':true,
            'Tools': true,
            'Gas': gas,
          }          
          );
      }

      isTrue(i:string):boolean{
        if(i == "1"){return true}
        else{return false}
      }

      isInDb(){
        if(this.appointment.Completed == 'waiting'){
          return true;
        }else{return false;}
      }


}
