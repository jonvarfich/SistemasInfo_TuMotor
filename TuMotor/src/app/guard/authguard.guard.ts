import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NgAuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  NgAuthService: any;
  constructor(private authService: NgAuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.NgAuthService.isLoggedIn()) {
      return true;
    }
    else{
      return true;
    }

    return this.router.parseUrl('home');
  }
}