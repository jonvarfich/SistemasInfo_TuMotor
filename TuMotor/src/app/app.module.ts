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
<<<<<<< HEAD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
=======
import { FooterComponent } from './components/footer/footer.component';
>>>>>>> 784d4aecc8ea77ac8faa39787fd77a9a6a3e98f2

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
    FooterComponent    
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
    NgbModule,
  ],
  providers: [
    NgAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
