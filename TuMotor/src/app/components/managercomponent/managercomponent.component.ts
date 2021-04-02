import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { NgAuthService } from 'src/app/services/auth.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-managercomponent',
  templateUrl: './managercomponent.component.html',
  styleUrls: ['./managercomponent.component.scss']
})
export class ManagercomponentComponent implements OnInit {
  Users: Array<User> = [];
  user: User;
  managerID: string;
  DateShow: string = 'pending';
  private AngularFirestore: any;
  Appointments: Array<Appointment> = [];
  constructor(private ngAuthService:NgAuthService, private usercrud:UserCrudService,private manager: ManagerService) {

  }

  ngOnInit(): void {

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
    this.managerID = this.ngAuthService.userdata.uid;

  }

  UserName(Uid: string): string{
    let User =  this.Users.find(x => x.uid == Uid);
    return User.email;
  }

  setDateProposal(Aid:string,Date:Date){
    console.log(Aid);
    this.ngAuthService.afs.collection('appointments').doc(Aid).update({'Date':Date, 'status':'responded'});
  }


}
