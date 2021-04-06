import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewreportComponent } from './viewreport.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: ViewreportComponent,
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewreportRoutingModule { }
