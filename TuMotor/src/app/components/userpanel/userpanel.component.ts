import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user'

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {

  @Input() public user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
