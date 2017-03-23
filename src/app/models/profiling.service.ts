/*
 * Angular 2 decorators and services
 */
import {
  Injectable, NgZone, OnInit,
} from '@angular/core';

@Injectable()
export class ProfilingService {
  private lastTimeUnstable;
  constructor(private ngZone: NgZone) {

    this.ngZone.onUnstable.subscribe(() => {
      this.lastTimeUnstable = new Date().getTime();
    });

    this.ngZone.onStable.subscribe(() => {
      const currentTime = new Date().getTime();
      if (this.lastTimeUnstable) {
        console.log(`Stable after ${currentTime - this.lastTimeUnstable}ms.`);
      }
      this.lastTimeUnstable = null;
    });

  }
}
