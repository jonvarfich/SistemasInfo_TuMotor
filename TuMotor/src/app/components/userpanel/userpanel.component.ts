import { Component, Input, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/services/auth.service';
import { SuperuserService } from 'src/app/services/superuser.service';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { Vehicle } from '../../models/vehicle'
import { User } from '../../models/user'
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';



@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {

  //@Input() public user: User;
  public user: User;
  public cUser: User;
  private AngularFirestore: any;
  public myAngularxQrCode: string = null;
  Vehicles: Array<Vehicle> = [];
  Appointments: Array<Appointment> = [];

  

  constructor(private ngAuthService: NgAuthService, private usercrud: UserCrudService, private superuser: SuperuserService) {
    this.myAngularxQrCode = 'Your QR code data string';
  
  }

  ngOnInit(): void {
    this.myAngularxQrCode = 'Your QR code data string';
    this.user = this.ngAuthService.userdata;
    this.usercrud.getallvehicles().subscribe(
      (Vehicles) => {
        //console.log(JSON.stringify(Vehicles,null,4));
        this.Vehicles = Vehicles;
      }
    );
    this.usercrud.getallAppointments().subscribe(
      (Appointments) => {
        //console.log(JSON.stringify(Appointments,null,4));
        this.Appointments = Appointments;
      }
    );
    this.usercrud.getUser().subscribe((User) => this.user = User);

  }

  disableVehicle(Vuid:string){
    console.log(Vuid);
    var answer = window.confirm("Está seguro que quiere desabilitar el vehiculo?");
    if (answer) {
      this.usercrud.DisableVehicle(Vuid);
    }
    else {
      //window.console.log('opción cancelada');
    }
  }

  vehicleName(CarUid: string): string{
    let Vehicle =  this.Vehicles.find(x => x.uid == CarUid);
    return Vehicle.name;
  }

  AcceptDate(Aid:string){
    this.ngAuthService.afs.collection('appointments').doc(Aid).update({'status':'accepted'})
  }
  RejectDate(Aid:string){
    this.ngAuthService.afs.collection('appointments').doc(Aid).update({'status':'rejected'})
  }
  
  getQRstring(uid):string{
    return uid;
  }

}