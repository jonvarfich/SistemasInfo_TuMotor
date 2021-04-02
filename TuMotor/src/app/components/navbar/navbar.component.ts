import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router, public ngAuthService: NgAuthService, private usercrud:UserCrudService) {
    
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
  isMechanic():boolean{
    //console.log(this.ngAuthService.userdata.power );
    if(this.user.power == "mechanic"){
      return true;
    }
    else{false;}
  }
  isManager():boolean{
    //console.log(this.ngAuthService.userdata.power );
    if(this.user.power == "manager"){
      return true;
    }
    else{false;}
  }

  internalRoute(page,dst){
    this.router.navigate([page], {fragment: dst});
  }

}
