import { Injectable } from '@angular/core';
import { Course } from './course.model';
import moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class CourseService {
  public actualCourses: Observable<any>;
  private actualCoursesSubject: BehaviorSubject<Course[]>;
  private courses: any;

  constructor(private http: Http) {
    this.courses = {};
    const search = new URLSearchParams();
    search.append('start', `0`);
    search.append('count', `10`);

    this.actualCourses = this.http.get('http://localhost:3004/courses', {search}).map((response) => {
      return response.json();
    });
  }

  public getCourses(sortBy: string = 'date'): Course[] {
    return Object.keys(this.courses)
      .map((id) => this.courses[id])
      .filter((course) => moment(course.date).diff(moment(), 'days') > -14)
      .sort((a, b) => a[sortBy] - b[sortBy]);
  }

  public getCourse(id: string): Observable<Course> {
    console.log(`get course ${id} -> ${JSON.stringify(this.courses[id])}`);
    return Observable.from([this.courses[id]]);
  }

  public addCourse(course: Course): void {
    // to implement
  }

  public deleteCourse(course: Course) {
    delete this.courses[course.id];
    this.actualCoursesSubject.next(this.getCourses());
  }

  public editCourse(course: Course) {
    this.actualCoursesSubject.next(this.getCourses());
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
