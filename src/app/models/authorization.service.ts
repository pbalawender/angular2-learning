import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class AuthorizationService implements OnDestroy {
  public static CURRENT_USER_INFO = 'currentUser';
  public static TOKEN = 'token';
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
    this.http.post('http://localhost:3004/auth/login', credentials).map((response) => {
      localStorage.setItem(AuthorizationService.TOKEN, response.json().token);
      return this.http.post('http://localhost:3004/auth/userInfo', {});
    }).switch().subscribe((response) => {
      const userInfo = response.json();
      console.log(userInfo);
      localStorage.setItem(AuthorizationService.CURRENT_USER_INFO, JSON.stringify(userInfo));
      this._userInfo.next(userInfo);
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
    this._userInfo.next(null);
    return true;
  }

  public isAuthenticated(): boolean {
    const currentUser = JSON.parse(localStorage.getItem(AuthorizationService.CURRENT_USER_INFO));
    return !!currentUser;
  }

  public ngOnDestroy() {
    // empty for now
  }

  private getUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem(AuthorizationService.CURRENT_USER_INFO));
    if (!!currentUser) {
      return currentUser;
    }
    return null;
  }

}
