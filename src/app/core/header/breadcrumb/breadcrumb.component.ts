import { ChangeDetectionStrategy, ChangeDetectorRef,
         Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../models/course.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  public routes = [];
  private routerEventsSubscription: Subscription;
  private courseSubscription: Subscription;
  constructor(private router: Router, private courseService: CourseService,
              private changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.routerEventsSubscription = this.router.events.filter((event) => {
      return event instanceof NavigationEnd;
    }).subscribe((event: NavigationEnd) => {
      this.routes = [];
      const urlParts = (event.urlAfterRedirects || event.url).split('/');
      if (urlParts[1] === 'courses') {
        this.routes.push({
          name: 'Courses',
          link: '#/courses'
        });
      }
      if (urlParts[2] === 'edit') {
        if (urlParts.length > 3) {
          this.courseSubscription = this.courseService.getCourse(urlParts[3])
            .subscribe((course: Course) => {
            this.routes.push({
              name: course.name,
              link: null
            });
            this.changeDetector.markForCheck();
          });
        }
      }
      if (urlParts[2] === 'add') {
        this.routes.push({
          name: 'Creating new course',
          link: null
        });
      }
      this.changeDetector.markForCheck();
    });
  }

  public ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }
}
