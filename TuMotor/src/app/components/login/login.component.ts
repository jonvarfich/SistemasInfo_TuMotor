import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService) {
    
  }

  ngOnInit(): void {
  }

  public static closemodal(){
    document.getElementById("close").click();
  }


}
