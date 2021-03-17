import { Component, Input, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user'

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {

  //@Input() public user: User;
  public user: User;

  constructor(private ngAuthService: NgAuthService) {
    this.user = this.ngAuthService.userdata;
  }

  ngOnInit(): void {
    this.user = this.ngAuthService.userdata;
  }

}
