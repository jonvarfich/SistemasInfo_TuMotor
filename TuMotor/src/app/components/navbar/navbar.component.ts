import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  public user = JSON.parse(localStorage.getItem('user'));

  constructor(public ngAuthService: NgAuthService) { }

  ngOnInit(): void {
  }

}
