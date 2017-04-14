import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Course, CourseService } from '../models';
import { LoaderService } from '../models/loader.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnDestroy {

  public courses: Observable<any>;

  // private coursesSub: Subscription;

  constructor(private courseService: CourseService, private loaderService: LoaderService,
              private changeDetector: ChangeDetectorRef, private router: Router) {
    // this.courses = this.courseService.getCourses();
    this.courses = this.courseService.actualCourses;
    this.courses.subscribe(console.log);
  }

  public ngOnDestroy() {
    // this.coursesSub.unsubscribe();
  }

  public filterCourses(search) {
    // if (search && search.length > 0) {
    //   this.courses = this.allCourses.filter((course) =>
    //     (course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    //     || course.description.toLowerCase().indexOf(search.toLowerCase()) > -1));
    // } else {
    //   this.courses = this.allCourses;
    // }
  }

  public handleCourseDelete(course: Course) {
    console.log(`Trying to delete course ${course.id}`);
    this.loaderService.showLoader();
    // fake timeout
    setTimeout(() => {
      this.courseService.deleteCourse(course);
      this.loaderService.hideLoader();
      this.changeDetector.markForCheck();
    }, 1000);

  }

  public handleCourseEdit(course: Course) {
    console.log(`Trying to edit course ${course.id}`);
    this.router.navigate(['/courses/edit', course.id]);
    // this.courseService.editCourse(course);
  }

}
