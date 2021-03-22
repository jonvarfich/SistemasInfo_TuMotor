import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit(): void {
  }

}
