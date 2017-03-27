import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ProfilingService {
  private lastTimeUnstable;
  constructor(private ngZone: NgZone) {

    this.ngZone.onUnstable.subscribe(() => {
      this.lastTimeUnstable = this.getCurrentTime();
    });

    this.ngZone.onStable.subscribe(() => {
      const currentTime = this.getCurrentTime();
      if (this.lastTimeUnstable) {
        console.log(`Stable after ${currentTime - this.lastTimeUnstable}ms.`);
      }
      this.lastTimeUnstable = null;
    });
  }

  public noop() {
    // noop
  }

  private getCurrentTime(): number {
    return new Date().getTime();
  }
}
