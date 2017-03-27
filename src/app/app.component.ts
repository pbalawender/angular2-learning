import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { ProfilingService } from './models';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { LoaderService } from './models';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private profilingService: ProfilingService,
              private loaderService: LoaderService,
              private router: Router) {
    this.profilingService.noop();
    this.router.events.subscribe((event: Event) => {
      this.handleRouterEvent(event);
    });
  }

  private handleRouterEvent(event: Event) {
    if (event instanceof NavigationStart) {
      this.loaderService.showLoader();
    } else if (event instanceof NavigationEnd
      || event instanceof NavigationCancel
      || event instanceof NavigationError) {
      this.loaderService.hideLoader();
    }
  }
}
