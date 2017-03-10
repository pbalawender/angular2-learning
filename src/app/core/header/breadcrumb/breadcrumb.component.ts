import { Component } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  private routes: string[] = [];

  constructor(router: Router) {
    // const routerState = router.routerState;
    // console.log('Breadcrumb: ' + routerState);
    // const routerEvents: Observable<Event> = router.events;
    // routerEvents.subscribe((value: Event) => {
    //   console.log(value.toString());
    // }, (error) => {
    //   console.error(error);
    // });
  }
}
