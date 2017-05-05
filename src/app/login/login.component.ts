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
  public user = {
    login: '',
    password: ''
  };

  constructor(private authorizationService: AuthorizationService, private router: Router,
              private loaderService: LoaderService) {
  }

  public ngOnInit() {
    // empty
  }

  public handleLogin() {
    this.loaderService.showLoader();
    this.authorizationService.login(this.user.login, this.user.password).subscribe((result) => {
      if (result) {
        this.errorMsg = null;
        this.router.navigate(['']);
      } else {
        this.errorMsg = 'Invalid username or password';
      }
      this.loaderService.hideLoader();
    });
  }
}
