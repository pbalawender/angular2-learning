import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../models';
import { LoaderService } from '../models/loader.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {

  public courses: Course[];

  constructor(private courseService: CourseService, private loaderService: LoaderService,
              private changeDetector: ChangeDetectorRef) {
    this.courses = this.courseService.getCourses();
  }

  public ngOnInit() {
    // console.log('hello `Courses` component');
  }

  public filterCourses(text) {
    this.courses = this.courseService.findCourses(text);
  }

  public handleCourseDelete(course: Course) {
    console.log(`Trying to delete course ${course.id}`);
    this.loaderService.showLoader();
    // fake timeout
    setTimeout(() => {
      this.courses = this.courseService.deleteCourse(course);
      this.loaderService.hideLoader();
      this.changeDetector.markForCheck();
    }, 1000);

  }

  public handleCourseEdit(course: Course) {
    console.log(`Trying to edit course ${course.id}`);
    this.courses = this.courseService.editCourse(course);
  }

}
