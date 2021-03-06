import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicioComponent } from './servicio.component';

const routes: Routes = [ {
  path: '',
  children:[
    {
      path: '',
      component: ServicioComponent
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }
