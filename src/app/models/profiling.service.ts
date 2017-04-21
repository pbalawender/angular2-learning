import { Injectable, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ProfilingService implements OnInit, OnDestroy {
  private lastTimeUnstable;
  private stableSubscription: Subscription;
  private unstableSubscription: Subscription;

  constructor(private ngZone: NgZone) {
  }

  public ngOnInit() {
    this.unstableSubscription = this.ngZone.onUnstable.subscribe(() => {
      this.lastTimeUnstable = this.getCurrentTime();
    });

    this.stableSubscription = this.ngZone.onStable.subscribe(() => {
      // const currentTime = this.getCurrentTime();
      // if (this.lastTimeUnstable) {
        // console.log(`Stable after ${currentTime - this.lastTimeUnstable}ms.`);
      // }
      // this.lastTimeUnstable = null;
    });
  }

  public ngOnDestroy() {
    this.unstableSubscription.unsubscribe();
    this.stableSubscription.unsubscribe();
  }

  public noop() {
    // noop
  }

  private getCurrentTime(): number {
    return new Date().getTime();
  }
}
