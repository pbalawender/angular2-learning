import { Injectable, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from './authorization.reducer';

@Injectable()
export class AuthorizationService {
  public static CURRENT_USER_INFO = 'currentUser';
  public static TOKEN = 'token';

  constructor(private http: Http, private store: Store<any>) {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.store.dispatch({type: LOGIN, payload: userInfo});
    }
  }

  public login(login: string, password: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const credentials = {
      login,
      password
    };
    this.http.post('http://localhost:3004/auth/login', credentials).map((response) => {
      localStorage.setItem(AuthorizationService.TOKEN, response.json().token);
      return this.http.post('http://localhost:3004/auth/userInfo', {});
    }).switch().subscribe((response) => {
      const userInfo = response.json();
      console.log(userInfo);
      localStorage.setItem(AuthorizationService.CURRENT_USER_INFO, JSON.stringify(userInfo));
      this.store.dispatch({type: LOGIN, payload: userInfo});
      subject.next(true);
    }, (err) => {
      console.log(err);
      subject.next(false);
    });

    return subject.asObservable();
  }

  public logout(): boolean {
    localStorage.removeItem(AuthorizationService.CURRENT_USER_INFO);
    localStorage.removeItem(AuthorizationService.TOKEN);
    this.store.dispatch({type: LOGOUT, payload: null});
    return true;
  }

  public isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem(AuthorizationService.CURRENT_USER_INFO));
    return !!currentUser;
  }

  private getUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem(AuthorizationService.CURRENT_USER_INFO));
    if (!!currentUser) {
      return currentUser;
    }
    return null;
  }

}
