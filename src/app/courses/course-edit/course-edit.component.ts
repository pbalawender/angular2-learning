import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CourseService } from '../../models/course.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent {

  public course = new Course('', 0, new Date(), '');

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.route.params
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
        }
      });
  }
}
