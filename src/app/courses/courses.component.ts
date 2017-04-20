import { ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy, OnInit } from '@angular/core';
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
export class CoursesComponent implements OnInit, OnDestroy {

  public courses: Observable<any>;
  public pageSize = 10;
  public page = 1;
  public total: number;

  // private coursesSub: Subscription;

  constructor(private courseService: CourseService, private loaderService: LoaderService,
              private changeDetector: ChangeDetectorRef, private router: Router) {
  }

  public ngOnInit() {
    this.handlePageChanged(1);
  }

  public ngOnDestroy() {
    // this.coursesSub.unsubscribe();
  }

  public handlePageChanged(page: number) {
    this.loaderService.showLoader();
    this.page = page;
    this.courses = this.courseService.getCourses(this.page, this.pageSize).map((response) => {
      this.total = response.total;
      this.loaderService.hideLoader();
      return response.courses;
    });
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
