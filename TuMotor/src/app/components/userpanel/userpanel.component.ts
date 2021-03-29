import { Component, Input, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/services/auth.service';
import { SuperuserService } from 'src/app/services/superuser.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { Vehicle } from '../../models/vehicle'
import { User } from '../../models/user'
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {

  //@Input() public user: User;
  public user: User;
  private AngularFirestore: any;
  Vehicles: Array<Vehicle> = [];


  constructor(private ngAuthService: NgAuthService, private usercrud: UserCrudService, private superuser: SuperuserService) {
    this.user = this.ngAuthService.userdata;
    
  }

  ngOnInit(): void {
    this.usercrud.getallvehicles().subscribe(
      (Vehicles) => {
        console.log(JSON.stringify(Vehicles,null,4));
        this.Vehicles = Vehicles;
      }
    );
  }

  //test(){
  //  this.superuser.makeadmin(10);
  //}


}