import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { NgAuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { SuperuserService } from 'src/app/services/superuser.service';
import { SuperadminService } from 'src/app/services/superadmin.service';


@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

  public cuser: User;
  private AngularFirestore: any;
  Users: Array<User> = [];

  constructor(private ngAuthService: NgAuthService, private usercrud: UserCrudService, private superadmin: SuperadminService) {
    this.cuser = this.ngAuthService.userdata;
  }

  ngOnInit(): void {
    this.cuser = this.ngAuthService.userdata;
    this.superadmin.getallUsers().subscribe(
      (Users) => {
        console.log(JSON.stringify(Users,null,4));
        this.Users = Users;
      }
    );
  }

  setRole(Uuid: string, Role: string){
    this.superadmin.roleChange(Uuid,Role);
  }


}
