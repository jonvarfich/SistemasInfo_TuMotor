import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MechanichomeComponent } from './mechanichome.component';

const routes: Routes = [{
  path: '',
  children:[
    {
      path: '',
      component: MechanichomeComponent
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanichomeRoutingModule { }
