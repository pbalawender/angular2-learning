import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthorizationService } from '../../models/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(public authorizationService: AuthorizationService) {

  }
}
