import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public userInfo = null;

  constructor(public store: Store<any>, private changeDetector: ChangeDetectorRef) {
    this.store.select<User>('userInfo').subscribe((user) => {
      this.userInfo = user;
      this.changeDetector.markForCheck();
    });
  }
}
