import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAppointmentComponent } from 'src/app/components/manage-appointment/manage-appointment.component';
import { MechanichomeComponent } from './mechanichome.component';

const routes: Routes = [{
  path: '',
  children:[
    {
      path: '',
      component: MechanichomeComponent
    },
    {
      path:'Appointment',
      component: ManageAppointmentComponent,
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanichomeRoutingModule { }
