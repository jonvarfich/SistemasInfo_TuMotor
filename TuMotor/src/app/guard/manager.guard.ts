import { Injectable } from '@angular/core';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user';
import { NgAuthService } from '../services/auth.service';
import { UserCrudService } from '../services/user-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  public power: string;
  public afs: AngularFirestore;
  constructor(private router:Router, private usercrud:UserCrudService, private ngAuthService: NgAuthService ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.ngAuthService.power == 'manager'){
      return true;
    }

    else{
      this.ngAuthService.redirectTo('/home');
      return false;
    }
    
  }

  
}
