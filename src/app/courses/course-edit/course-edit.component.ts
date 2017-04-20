import { ChangeDetectionStrategy, Component,
  OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../../models/course.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from '../../models/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit, OnDestroy {

  public course = new Course(0, '', 0, new Date(), '');
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
              private changeDetector: ChangeDetectorRef) {
    // empty
  }

  public ngOnInit() {
    this.subscription = this.route.params
      .switchMap((params: Params) => {
        const courseId = `${params['id']}`;
        if (courseId) {
          return this.courseService.getCourse(courseId);
        }
        return null;
      }).subscribe((course: Course) => {
      console.log('course: ' + JSON.stringify(course));
      if (course) {
        this.course = course;
        this.changeDetector.markForCheck();
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
