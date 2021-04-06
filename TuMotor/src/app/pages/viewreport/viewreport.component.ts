import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { NgAuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit {

  public State: string = null;
  public ready: boolean = false;

  Users: Array<User> = [];
  Appointments: Array<Appointment> = [];
  Vehicles: Array<Vehicle> = [];


  UserQuery:User;
  mechAppointments: Array<Appointment> = [];

  

  constructor(private ngAuthService:NgAuthService, private usercrud:UserCrudService,private manager: ManagerService) {

    this.usercrud.getallAppointments().subscribe(
      (Appointments) => {
        this.Appointments = Appointments;
      }
    );
    this.manager.getallUsers().subscribe(
      (Users) => {
        this.Users = Users;
      }
    );
    
  }

  ngOnInit(): void {
  }

  vehicleSub(uid){
    this.usercrud.getallvehiclesR(uid).subscribe(
      (Vehicles) => {
        this.Vehicles = Vehicles;
      }
    );
  }

  vehicleUN(){
    this.Vehicles = null;
  }

  mechReset(){
    this.mechAppointments = null;
  }

  clientQuery(user:string){

    this.vehicleUN();
    this.ready = false;

    this.UserQuery = this.Users.find(
      val => {
        return val.email == user
      }
    );
    this.vehicleSub(this.UserQuery.uid);

    this.ready = true;

  }

  mechanicQuery(email){

    this.ready = false;
   
    this.mechReset();
    let Mechanic = this.Users.find(
      val => {
        return val.email == email
      }
    );

    this.mechAppointments = this.Appointments.filter(
      val => {
        return val.mechanic == Mechanic.uid
      }
    );
    this.ready = true;
  }

  vehicleAppointments(uid){

    this.ready = false;

    this.mechReset();

    this.mechAppointments = this.Appointments.filter(
      val => {
        return val.CarUid == uid
      }
    );
    this.ready = true;
  }

}
