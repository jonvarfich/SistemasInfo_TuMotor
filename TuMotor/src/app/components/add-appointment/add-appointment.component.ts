import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { Appointment } from 'src/app/models/appointment';
import { NgAuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  public user: User;
  @Input() Vehicles:Array<Vehicle>;

  constructor(private ngAuthService: NgAuthService, private usercrud: UserCrudService) { }

  ngOnInit(): void {
    this.user = this.ngAuthService.userdata;
  }

  setAppointment(CarUid:string, Note:string){

    let UserUid = this.ngAuthService.userdata.uid;
    let Appointment: Appointment = {
      UserUid: UserUid,
      CarUid: CarUid,
      Note: Note,
      status: "requested",
      Completed: "waiting",
    }
    this.usercrud.setAppointment(Appointment, UserUid);
  }

}


