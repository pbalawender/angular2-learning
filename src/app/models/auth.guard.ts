import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  public canActivate(): boolean {
    if (this.authorizationService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
