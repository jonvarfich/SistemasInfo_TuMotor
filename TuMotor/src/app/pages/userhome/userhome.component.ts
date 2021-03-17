import { Component, OnInit } from '@angular/core';
import { NgAuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  public user: User;
  constructor(private ngAuthService: NgAuthService) {
    this.user = ngAuthService.userdata;
  }

  ngOnInit(): void {
  }

}
