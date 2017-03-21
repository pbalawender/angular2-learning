import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

  // private isAuth = false;
  public static CURRENT_USER_INFO = 'currentUser';

  constructor() {
    // empty
  }

  public login(user: string, password: string): boolean {
    const validCredentials =  user === 'admin' && password === 'admin';
    if (validCredentials) {
      localStorage.setItem(AuthorizationService.CURRENT_USER_INFO, JSON.stringify({
        name: 'John Doe',
        token: Math.random().toString(36).substr(2)
      }));
    }
    return validCredentials;
  }

  public logout(): boolean {
    localStorage.removeItem(AuthorizationService.CURRENT_USER_INFO);
    return true;
  }

  public isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem(AuthorizationService.CURRENT_USER_INFO));
    return !!currentUser;
  }

  public getUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem(AuthorizationService.CURRENT_USER_INFO));
    if (!!currentUser) {
      return currentUser;
    }
    return {
      name: '',
      token: null
    };
  }
}
