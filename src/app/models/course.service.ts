import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable()
export class CourseService {
  private courses: any;

  constructor() {
    this.courses = {};

    for (let i = 1; i <= 3; i++) {
      let course = new Course(`Course #${i}`, i * 60, new Date(), 'Lorem ipsum...');
      this.courses[course.id] = course;
    }
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
    console.log(`New filter: ${search}`);
    if (search && search.length > 0) {
      return this.getCourses().filter((course) =>
        (course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        || course.description.toLowerCase().indexOf(search.toLowerCase()) > -1));
    } else {
      return this.getCourses();
    }
  }

}
