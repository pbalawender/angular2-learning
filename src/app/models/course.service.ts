import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable()
export class CourseService {
  private courses: Course[];

  constructor() {
    this.courses = [
      new Course('Course #1', 60, new Date(), 'Lorem ipsum...'),
      new Course('Course #2 (with longer name)', 120, new Date(), '...ipsum lorem?')
    ];
  }

  public getCourses(): Course[] {
    return this.courses;
  }

  public addCourse(course: Course): void {
    // to implement
  }

  public deleteCourse(course: Course): Course[] {
    let index = this.courses.indexOf(course);
    console.log(`Removing course with index ${index}`);
    if (index > -1) {
      this.courses.splice(index, 1);
    }
    return this.courses;
  }

  public editCourse(course: Course): Course[] {
    return this.courses;
  }

  public findCourses(search: string): Course[] {
    console.log(`New filter: ${search}`);
    if (search && search.length > 0) {
      return this.courses.filter((course) =>
        (course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        || course.description.toLowerCase().indexOf(search.toLowerCase()) > -1));
    } else {
      return this.courses;
    }
  }

}
