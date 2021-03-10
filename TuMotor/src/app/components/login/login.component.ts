import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: NgAuthService, public router: Router) {
  }

  ngOnInit(): void {
  }
  //Se leen los datos puestos y llama al método que inicia la sesión:
  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.auth.emailAndPassword(email, password).then(credentials => {
      this.router.navigate(['/home']);
      alert("Login exitoso");

    }).catch(err => {
      alert(err.message);
    });
  }

  onGoogle() {
    this.auth.googleLogin();
  }



  public static closemodal(){
    document.getElementById("close").click();
  }


}
