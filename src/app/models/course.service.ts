import { Injectable } from '@angular/core';
import { Course } from './course.model';
import moment from 'moment';

@Injectable()
export class CourseService {
  private courses: any;

  constructor() {
    this.courses = {};

    let course1 = new Course('Course #1', 60, moment().add(-7, 'days').toDate(), 'Lorem ipsum...');
    this.courses[course1.id] = course1;

    let course2 = new Course('Course #2', 60, moment().add(7, 'days').toDate(), 'Lorem ipsum...');
    this.courses[course2.id] = course2;

    let course3 = new Course('Course #3', 60, moment().add(-16, 'days').toDate(), 'Lorem ipsum...');
    this.courses[course3.id] = course3;
  }

  public getCourses(): Course[] {
    return Object.keys(this.courses).map((id) => this.courses[id]);
  }

  public getCourse(id: string) {
    return this.courses[id];
  }

  public addCourse(course: Course): void {
    // to implement
  }

  public deleteCourse(course: Course): Course[] {
    delete this.courses[course.id];
    return this.getCourses();
  }

  public editCourse(course: Course): Course[] {
    return this.getCourses();
  }

  public findCourses(search: string): Course[] {
    // console.log(`New filter: ${search}`);
    if (search && search.length > 0) {
      return this.getCourses().filter((course) =>
        (course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        || course.description.toLowerCase().indexOf(search.toLowerCase()) > -1));
    } else {
      return this.getCourses();
    }
  }

}
