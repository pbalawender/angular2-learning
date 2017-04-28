import { ChangeDetectionStrategy, Component,
  OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../../models/course.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from '../../models/course.model';
import { Observable, Subscription } from 'rxjs';
import { Author } from '../../models/author.model';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit, OnDestroy {

  public course = new Course(0, '', 0, null, '', []);
  public authors: Observable<Author[]>;
  private isEdit = false;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
              private changeDetector: ChangeDetectorRef) {
    // empty
  }

  public ngOnInit() {
    this.subscription = this.route.params
      .switchMap((params: Params) => {
        const courseId = `${params['id']}`;
        if (courseId && courseId !== 'undefined') {
          return this.courseService.getCourse(courseId);
        }
        return [];
      }).subscribe((course: Course) => {
      console.log('course: ' + JSON.stringify(course));
      if (course) {
        this.course = course;
        this.isEdit = true;
        this.changeDetector.markForCheck();
      }
    });
    this.authors = this.courseService.getAuthors();
  }

  public handleSubmit() {
    console.log('Submit ' + JSON.stringify(this.course));
    const action = this.isEdit ? this.courseService.editCourse(this.course) :
      this.courseService.addCourse(this.course);
    action.subscribe((course: Course) => {
      console.log('course: ' + JSON.stringify(course));
      if (course) {
        this.course = course;
        this.isEdit = true;
        this.changeDetector.markForCheck();
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
