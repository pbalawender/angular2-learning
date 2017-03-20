import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../models';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public courses: Course[];

  constructor(private courseService: CourseService) {
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
    this.courses = this.courseService.deleteCourse(course);
  }

  public handleCourseEdit(course: Course) {
    console.log(`Trying to edit course ${course.id}`);
    this.courses = this.courseService.editCourse(course);
  }

}
