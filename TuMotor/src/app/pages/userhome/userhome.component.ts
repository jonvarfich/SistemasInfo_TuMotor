import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));

  constructor(private ngAuthService: NgAuthService) { }

  ngOnInit(): void {
   
  }
<<<<<<< HEAD

=======
>>>>>>> 19465e6c41cb5d3238d1ef83e4a6d73ef279b0a1
}
