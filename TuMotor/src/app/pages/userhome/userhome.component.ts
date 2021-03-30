import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService} from '../../services/auth.service';

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
}
