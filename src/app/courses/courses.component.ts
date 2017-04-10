import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Course, CourseService } from '../models';
import { LoaderService } from '../models/loader.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnDestroy {

  public courses: Course[];
  private allCourses: Course[];
  private coursesSub: Subscription;

  constructor(private courseService: CourseService, private loaderService: LoaderService,
              private changeDetector: ChangeDetectorRef, private router: Router) {
    // this.courses = this.courseService.getCourses();
    this.coursesSub = this.courseService.actualCourses.subscribe((actualCourses: Course[]) => {
      console.log('new courses: ' + JSON.stringify(actualCourses.map((course) => course.id + '-' + course.name)));
      this.courses = actualCourses;
      this.allCourses = actualCourses;
    });
  }

  public ngOnDestroy() {
    this.coursesSub.unsubscribe();
  }

  public filterCourses(search) {
    if (search && search.length > 0) {
      this.courses = this.allCourses.filter((course) =>
        (course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        || course.description.toLowerCase().indexOf(search.toLowerCase()) > -1));
    } else {
      this.courses = this.allCourses;
    }
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
