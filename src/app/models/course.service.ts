import { Injectable, OnInit } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class CourseService implements OnInit {

  constructor(private http: Http) {
  }

  public ngOnInit() {
    // empty
  }

  public getCourses(page: number, pageSize: number, sortBy: string = 'date'): Observable<any> {
    const search = new URLSearchParams();
    search.append('start', '' + (page - 1) * pageSize);
    search.append('count', '' + pageSize);

    return this.http.get('http://localhost:3004/courses', {search})
    .map((response) => {
      const data = response.json();
      data.courses = data.courses.map((rawCourse) => this.mapCourse(rawCourse));
      return data;
    });
  }

  public getCourse(id: string): Observable<Course> {
    return this.http.get(`http://localhost:3004/courses/${id}`).map((response) => {
      return this.mapCourse(response.json());
    });
  }

  public addCourse(course: Course): void {
    // to implement
  }

  public deleteCourse(course: Course) {
    // delete this.courses[course.id];
    // this.actualCoursesSubject.next([]);
  }

  public editCourse(course: Course) {
    // this.actualCoursesSubject.next([]);
  }

  public findCourses(search: string): Course[] {
    // console.log(`New filter: ${search}`);
    if (search && search.length > 0) {
      return [].filter((course) =>
        (course.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        || course.description.toLowerCase().indexOf(search.toLowerCase()) > -1));
    } else {
      return [];
    }
  }

  private mapCourse(object: any): Course {
    return new Course(object.id,
      object.name,
      object.length,
      new Date(Date.parse(object.date)),
      object.description,
      object.isTopRated);
  }
}
