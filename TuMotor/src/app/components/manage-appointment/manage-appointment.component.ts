import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
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

  constructor(
    private mechanic:MechanicService
  ) { }

  ngOnInit(): void {

    this.mechanic.getAppointment(this.appointmentuid).subscribe((appointment) => this.appointment = appointment);
    //this.getUserDoc();
    //this.getFirstNameByUid(this.appointmentuid);

  }

  getUserDoc(){
    this.mechanic.afs.collection<Appointment>('appointments').doc<Appointment>(this.appointmentuid).ref.get().then(
      function(doc){
          console.log(doc.data().UserUid);
      }
    );

  }

  getFirstNameByUid(uid: string) {
    const userDocument = this.mechanic.afs.collection("appointment").doc<Appointment>(this.appointmentuid);
    return userDocument.ref.get().then((doc) => {
         const result = doc.exists ? doc.data().UserUid : null;
         console.log(result);
         return result;
    });
}

}
