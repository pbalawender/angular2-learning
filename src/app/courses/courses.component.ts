import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../models';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  private courses: Course[];

  constructor(private courseService: CourseService) {
    this.courses = this.courseService.getCourses();
    console.log(JSON.stringify(this.courses));
  }

  public ngOnInit() {
    console.log('hello `Courses` component');

  }

}
