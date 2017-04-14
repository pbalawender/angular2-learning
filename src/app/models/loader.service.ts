import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  public show: Observable<boolean>;
  private _show: BehaviorSubject<boolean>;

  constructor() {
    this._show = new BehaviorSubject(false);
    this.show = this._show.asObservable();
  }
  public showLoader() {
    this._show.next(true);
  }
  public hideLoader() {
    setTimeout(() => this._show.next(false), 500);
  }
}
