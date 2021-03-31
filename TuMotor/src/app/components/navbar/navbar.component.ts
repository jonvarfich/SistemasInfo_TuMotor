import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgAuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  public user:User;

  constructor(public ngAuthService: NgAuthService, private usercrud:UserCrudService) {
    
  }

  ngOnInit(): void {
    this.usercrud.getUser().subscribe((User) => this.user = User);
  }

  isSudo():boolean{
    //console.log(this.ngAuthService.userdata.power );
    if(this.user.power == "sudo"){
      return true;
    }
    else{false;}
  }

}
