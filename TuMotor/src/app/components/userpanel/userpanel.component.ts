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
import { UpdatemodalComponent } from '../updatemodal/updatemodal.component';
import { finalize } from 'rxjs/operators';




@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {

  //@Input() public user: User;
  public user: User;
  public cUser: User;
  public DateShow:string;
  public mod:string;
  private AngularFirestore: any;
  Vehicles: Array<Vehicle> = [];
  Appointments: Array<Appointment> = [];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  

  constructor(private ngAuthService: NgAuthService, private usercrud: UserCrudService, private superuser: SuperuserService,
    private storage: AngularFireStorage) {
    this.user = this.ngAuthService.userdata;   
  }

  ngOnInit(): void {
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
    this.DateShow = 'responded';

  }

  disableVehicle(Vuid:string){
    console.log(Vuid);
    var answer = window.confirm("¿Está seguro que quiere desabilitar el vehiculo?");
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

  vehiclemod(vehicleuid){
    let notify = new UpdatemodalComponent(this.ngAuthService,this.usercrud, vehicleuid);
  }

  modCar(uid: string){
    this.mod = uid;
  }



  //////

  updateVehicle(name: string, placa:string, color: string) {
    if (name != '' && placa != '' && color != '') {
      this.ngAuthService.afs.collection<User>('users').doc<User>(this.ngAuthService.userdata.uid).collection<Vehicle>('vehicles')
      .doc<Vehicle>(this.mod).update(
        {
          'name': name,
          'color': color,
          'placa': placa,
        }
      );
      this.mod = null;

    } else {
      alert('Must fill name field');
    }
  }

  //Este método no está verificando que sólo se seleccione un archivo .jpg o .png
  uploadFileV(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(

        finalize( () => this.photoupdateV( fileRef.getDownloadURL() ) )
     )
    .subscribe( )

  }

  photoupdateV(str:Observable<string>){
    this.downloadURL = str;
    console.log(this.downloadURL);
    this.downloadURL.subscribe(
      val => this.ngAuthService.afs.collection<User>('users').doc<User>(this.ngAuthService.userdata.uid).collection<Vehicle>('vehicles')
      .doc<Vehicle>(this.mod).update(
        {
          'foto':val,
        }
      )
    )

  }

  nullmod(){
    this.mod = null;
  }


}