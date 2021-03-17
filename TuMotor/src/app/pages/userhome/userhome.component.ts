import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

<<<<<<< HEAD
  public user = JSON.parse(localStorage.getItem('user'));

  constructor(private ngAuthService: NgAuthService) { }

  ngOnInit(): void {
   
=======
  public user: User;
  constructor(private ngAuthService: NgAuthService, private router: Router) {
    this.user = ngAuthService.userdata;
  }

  public ngOnInit(): void {
>>>>>>> Mu-4
  }

}
