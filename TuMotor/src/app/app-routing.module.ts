import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full',
  },
  
  {
    path:'',
    children: [
      {
        path:'home',
        loadChildren: () => import('./pages/home/home.module').then(function (m) {
            return m.HomeModule;
          }),
      },
    ],
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
