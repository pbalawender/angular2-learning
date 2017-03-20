import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../models/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorMsg: string;
  public user: string;
  public password: string;

  constructor(private authorizationService: AuthorizationService, private router: Router) {

  }

  public ngOnInit() {
    console.log('hello from login component');
  }

  public handleLogin() {
    let pass = this.password;
    this.password = '';
    if (this.authorizationService.login(this.user, pass)) {
      this.errorMsg = null;
      this.router.navigate(['']);
    } else {
      this.errorMsg = 'Invalid username or password';
    }
  }
}
