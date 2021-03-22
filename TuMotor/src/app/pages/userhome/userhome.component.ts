import { Component, OnInit } from '@angular/core';
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

>>>>>>> 784d4aecc8ea77ac8faa39787fd77a9a6a3e98f2
}
