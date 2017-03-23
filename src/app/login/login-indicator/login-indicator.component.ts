import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthorizationService } from '../../models/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-indicator',
  templateUrl: './login-indicator.component.html',
  styleUrls: ['./login-indicator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginIndicatorComponent {

  constructor(public authorizationService: AuthorizationService, private router: Router) {

  }

  public handleLogout() {
    if (this.authorizationService.logout()) {
      this.router.navigate(['login']);
    }
  }

}
