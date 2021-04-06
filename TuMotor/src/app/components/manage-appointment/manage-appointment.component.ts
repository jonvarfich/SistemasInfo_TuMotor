import { Component, Input, OnInit } from '@angular/core';
import { data, map } from 'jquery';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import {Repairorder} from 'src/app/models/repairorder';
import { MechanicService } from 'src/app/services/mechanic.service';
import { FormsModule } from '@angular/forms';
import { NgAuthService } from 'src/app/services/auth.service';


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
  public edit: boolean = false;

  public BackupTire: boolean = false;
  public Keys: boolean = false;
  public Cat: boolean = false;
  public Player: boolean = false;
  public Tools: boolean = false;
  

  constructor(
    private mechanic:MechanicService,
    private ngAuthService:NgAuthService,
  ) {

  }

  ngOnInit(): void {

    this.getAppointment(this.appointmentuid);

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

      setRepairOrder(gas:number){

        this.appointment.Completed = "standby";
        this.appointment.BackupTire = this.BackupTire;
        this.appointment.Keys = this.Keys;
        this.appointment.Cat = this.Cat;
        this.appointment.Player = this.Player;
        this.appointment.Tools = this.Tools,
        this.appointment.Gas = gas;

        this.mechanic.afs.collection<Appointment>('appointments').doc<Appointment>(this.appointmentuid).update(
          {
            'Completed': "standby",
            'BackupTire': this.BackupTire,
            'Keys': this.Keys,
            'Cat': this.Cat,
            'Player': this.Player,
            'Tools': this.Tools,
            'Gas': gas,
            'mechanic':this.ngAuthService.userdata.uid,
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

      UpdateRepair(Process:string,Fixes:string,Diag:string){
        this.mechanic.afs.collection<Appointment>('appointments').doc<Appointment>(this.appointment.uid).update(
          {
            'Process':Process,
            'Fixes':Fixes,
            'Diagnostic':Diag,
          }
        );
      }

      FinalOrder(){
        this.mechanic.afs.collection<Appointment>('appointments').doc<Appointment>(this.appointmentuid).update(
          {
          'Completed':'repaired',
          'status':'repaired',
          }
        );
      }

      Reload(){
        window.location.reload();
      }


}
