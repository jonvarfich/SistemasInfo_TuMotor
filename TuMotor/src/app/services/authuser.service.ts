import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  private user: User;

  set authUser(user: User){
    this.user = user;
  }

  get authUser(){
    return this.user;
  }

  logUser(user: User){
    this.user = user;
    this.router.navigate(['userhome']);

  }

  constructor(public router: Router) { }

}
