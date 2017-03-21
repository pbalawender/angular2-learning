import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  public canActivate(): boolean {
    if (localStorage.getItem(AuthorizationService.CURRENT_USER_INFO)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
