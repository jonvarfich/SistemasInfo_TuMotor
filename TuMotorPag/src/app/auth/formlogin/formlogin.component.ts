import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router} from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formlogin',

})
export class FormloginComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  //Lee los datos para iniciar sesion:
  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.emailAndPassword(email, password).then(credentials => {
      this.router.navigate(['/home'])
      alert("Login exitoso");

    }).catch(err => {
      alert(err.message);
    })
  }

  onGoogle(){
    this.auth.googleLogin();
  }

}