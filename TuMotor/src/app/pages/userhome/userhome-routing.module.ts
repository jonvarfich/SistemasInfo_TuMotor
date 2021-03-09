import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserhomeComponent } from './userhome.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: UserhomeComponent
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserhomeRoutingModule { }
