import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationGuard} from './guard/authguard.guard'

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
      },{
        path:'servicio',
        loadChildren: () => import('./pages/servicio/servicio.module').then(function (m) {
            return m.ServicioModule;
          }),
      },{
        path:'nosotros',
        loadChildren: () => import('./pages/nosotros/nosotros.module').then(function (m) {
            return m.NosotrosModule;
          }),
      },{
        path:'contacto',
        loadChildren: () => import('./pages/contacto/contacto.module').then(function (m) {
            return m.ContactoModule;
          }),
      },{
        path:'userhome',
        loadChildren: () => import('./pages/userhome/userhome.module').then(function (m) {
            return m.UserhomeModule;
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
