import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../models/authorization.service';
import { Router } from '@angular/router';
import { LoaderService } from '../models/loader.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public errorMsg: string;
  public user: string;
  public password: string;

  constructor(private authorizationService: AuthorizationService, private router: Router,
              private loaderService: LoaderService) {

  }

  public ngOnInit() {
    console.log('hello from login component');
  }

  public handleLogin() {
    this.loaderService.showLoader();
    let pass = this.password;
    this.password = '';
    if (this.authorizationService.login(this.user, pass)) {
      this.errorMsg = null;
      this.router.navigate(['']);
    } else {
      this.errorMsg = 'Invalid username or password';
    }
    // fake timeout
    setTimeout(() => this.loaderService.hideLoader(), 500);
  }
}
