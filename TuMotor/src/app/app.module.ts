import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
/// Angular Modules /////
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
/////////////////////////
import { NgAuthService } from "./services/auth.service";
import { RegisterComponent } from './components/register/register.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { ManagerdatesComponent } from './pages/managerdates/managerdates.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { MechanichomeComponent } from './pages/mechanichome/mechanichome.component';

import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { UpdatemodalComponent } from './components/updatemodal/updatemodal.component';
import { SuperadminComponent} from './pages/superadmin/superadmin.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { ManagercomponentComponent } from './components/managercomponent/managercomponent.component';

import { QRCodeModule } from 'angularx-qrcode';




@NgModule({
  declarations: [
    AppComponent,
    ServicioComponent,
    NavbarComponent,
    HomeComponent,
    LandingComponent,
    NosotrosComponent,
    ContactoComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    UserpanelComponent,
    ManagerdatesComponent,
    FooterComponent,
    AdminhomeComponent,
    MechanichomeComponent,
    AddVehicleComponent,    
    ProfileComponent,
    OrdenesComponent,
    ReporteComponent,
    UpdatemodalComponent,
    SuperadminComponent,
    AddAppointmentComponent,
    ManagercomponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    QRCodeModule
  ],
  providers: [
    NgAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
