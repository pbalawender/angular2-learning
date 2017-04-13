import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class AuthorizationService {
  public static CURRENT_USER_INFO = 'currentUser';
  public userInfo: Observable<any>;
  private _userInfo: BehaviorSubject<any>;

  constructor(private http: Http) {
    this._userInfo = new BehaviorSubject(this.getUserInfo());
    this.userInfo = this._userInfo.asObservable();
  }

  public login(user: string, password: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const credentials = {
      login: user,
      password
    };
    this.http.post('http://localhost:3004/auth/login', credentials).subscribe((token) => {
      localStorage.setItem(AuthorizationService.CURRENT_USER_INFO, JSON.stringify(token));
      subject.next(true);
    }, (err) => {
      console.log(err);
      subject.next(false);
    });

    return subject.asObservable();
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
