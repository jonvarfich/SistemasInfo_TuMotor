import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgAuthService } from '../services/auth.service';
import { UserCrudService } from '../services/user-crud.service';

@Injectable({
  providedIn: 'root'
})
export class MechanicGuard implements CanActivate {
  constructor(private router:Router, private usercrud:UserCrudService, private ngAuthService: NgAuthService ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let power: string;
      this.usercrud.getUser().subscribe(val => power = val.power);
      
      if(power == 'mechanic'){
        return true;
      }
  
      else{
        this.ngAuthService.redirectTo('/home')
        return false;
      }

  }

  
}
