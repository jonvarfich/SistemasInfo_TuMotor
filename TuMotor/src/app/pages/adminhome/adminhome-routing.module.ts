import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminhomeComponent } from './adminhome.component';

const routes: Routes = [{
  path: '',
  children:[
    {
      path: '',
      component: AdminhomeComponent
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminhomeRoutingModule { }
