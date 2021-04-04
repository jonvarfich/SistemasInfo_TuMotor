import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'src/app/services/user-crud.service';
import { NgAuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService, public usercrud: UserCrudService) {
    
  }

  ngOnInit(): void {
  }

  public static closemodal(){
    document.getElementById("close").click();
  }

  SignIn(userName, userPassword){
    this.ngAuthService.SignIn(userName, userPassword);
    this.usercrud.InitUserCrud();
  }


}
