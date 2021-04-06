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
        canActivate:[AuthenticationGuard],
        loadChildren: () => import('./pages/userhome/userhome.module').then(function (m) {
            return m.UserhomeModule;
          }),
        
      },
      {
        path:'managerdates',
        loadChildren: () => import('./pages/managerdates/managerdates.module').then(function (m) {
          return m.ManagerdatesModule;
        })
      },
      {
        path:'adminhome',
        loadChildren: () => import('./pages/adminhome/adminhome.module').then(function (m) {
          return m.AdminhomeModule;
        })
      },
      {
        path:'mechanichome',
        loadChildren: () => import('./pages/mechanichome/mechanichome.module').then(function (m) {
          return m.MechanichomeModule;
        })
      },
      {
        path:'sudo',
        loadChildren: () => import('./pages/superadmin/superadmin.module').then(function (m) {
          return m.SuperadminModule;
        })
      },
      {
        path:'reports',
        loadChildren: () => import('./pages/viewreport/viewreport.module').then(function (m) {
          return m.ViewreportModule;
        })
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
