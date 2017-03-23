import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthorizationService } from '../../models/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-indicator',
  templateUrl: './login-indicator.component.html',
  styleUrls: ['./login-indicator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginIndicatorComponent {
  @Input() public userName: any;

  constructor(private router: Router, private authService: AuthorizationService) {

  }

  public handleLogout() {
    if (this.authService.logout()) {
      this.router.navigate(['login']);
    }
  }

}
