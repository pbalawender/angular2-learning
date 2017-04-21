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
  public search = '';

  constructor(private courseService: CourseService, private loaderService: LoaderService,
              private changeDetector: ChangeDetectorRef, private router: Router) {
  }

  public ngOnInit() {
    this.handlePageChanged(this.page);
  }

  public ngOnDestroy() {
    // this.coursesSub.unsubscribe();
  }

  public handlePageChanged(page: number) {
    this.loaderService.showLoader();
    this.page = page;
    this.courses = this.courseService.getCourses(this.page, this.pageSize, this.search)
      .map((response) => {
      this.total = response.total;
      this.loaderService.hideLoader();
      return response.courses;
    });
  }

  public handleCourseDelete(course: Course) {
    console.log(`Trying to delete course ${course.id}`);
    this.loaderService.showLoader();
    this.courseService.deleteCourse(course).subscribe(() => {
      this.loaderService.hideLoader();
      this.handlePageChanged(1);
      this.changeDetector.markForCheck();
    }, (err) => {
      console.error(err);
      this.loaderService.hideLoader();
    });
  }

  public handleCourseEdit(course: Course) {
    console.log(`Trying to edit course ${course.id}`);
    this.router.navigate(['/courses/edit', course.id]);
  }

}
