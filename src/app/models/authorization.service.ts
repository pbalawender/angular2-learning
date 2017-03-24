import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthorizationService {
  public static CURRENT_USER_INFO = 'currentUser';
  public userInfo: Observable<any>;
  private _userInfo: BehaviorSubject<any>;

  constructor() {
    this._userInfo = new BehaviorSubject(this.getUserInfo());
    this.userInfo = this._userInfo.asObservable();
  }

  public login(user: string, password: string): boolean {
    const validCredentials =  user === 'admin' && password === 'admin';
    if (validCredentials) {
      let userInfo = {
        name: 'John Doe',
        token: Math.random().toString(36).substr(2)
      };
      this._userInfo.next(userInfo);
      localStorage.setItem(AuthorizationService.CURRENT_USER_INFO, JSON.stringify(userInfo));
    }
    return validCredentials;
  }

  public logout(): boolean {
    localStorage.removeItem(AuthorizationService.CURRENT_USER_INFO);
    this._userInfo.next(null);
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
    return null;
  }
}
