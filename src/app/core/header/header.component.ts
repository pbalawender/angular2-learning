import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AuthorizationService } from '../../models/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public userInfo = {};

  constructor(public authService: AuthorizationService, private changeDetector: ChangeDetectorRef) {
    authService.userInfo.subscribe((user) => {
      console.log(user);
      this.userInfo = user;
      this.changeDetector.markForCheck();
    });
  }
}
