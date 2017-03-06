import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable()
export class CourseService {
  private courses: Course[];

  constructor() {
    this.courses = [
      new Course('Course #1', 60, new Date(), 'Lorem ipsum...'),
      new Course('Course #2', 120, new Date(), '...lorem ipsum')
    ];
  }

  public getCourses(): Course[] {
    return this.courses;
  }

  public addCourse(course: Course): void {
    // to implement
  }

  public deleteCourse(course: Course): void {
    // to implement
  }

  public editCourse(course: Course): void {
    // to implement
  }

  public findCourses(search: string): Course[] {
    return [];
  }

}
