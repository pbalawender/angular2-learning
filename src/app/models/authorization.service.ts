import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

  private isAuth = false;

  constructor() {
    // empty
  }

  public login(user: string, password: string): boolean {
    this.isAuth = user === 'admin' && password === 'admin';
    return this.isAuth;
  }

  public logout(): boolean {
    this.isAuth = false;
    return true;
  }

  public isAuthenticated(): boolean {
    return this.isAuth;
  }

  public getUserInfo() {
    return {
      name: 'Foo Bar'
    };
  }
}
