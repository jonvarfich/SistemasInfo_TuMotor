import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { ContactoComponent } from './contacto.component';

const routes: Routes = [{
  path: '',
  children:[
    {
      path: '',
      component: ContactoComponent
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
