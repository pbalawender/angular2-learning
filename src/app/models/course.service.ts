import { Injectable, OnInit } from '@angular/core';
import { Course } from './course.model';
import { Observable } from 'rxjs';
import { Http, URLSearchParams } from '@angular/http';
import moment from 'moment';

@Injectable()
export class CourseService implements OnInit {

  constructor(private http: Http) {
  }

  public ngOnInit() {
    // empty
  }

  public getCourses(page: number,
                    pageSize: number,
                    query: string,
                    sortBy: string = 'date'): Observable<any> {
    const search = new URLSearchParams();
    search.append('start', '' + (page - 1) * pageSize);
    search.append('count', '' + pageSize);
    search.append('query', query);
    search.append('sort', sortBy);

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

  public deleteCourse(course: Course): Observable<any> {
    return this.http.delete(`http://localhost:3004/courses/${course.id}`);
  }

  public editCourse(course: Course) {
    return this.http.put(`http://localhost:3004/courses/${course.id}`, this.remapCourse(course))
      .map((response) => {
        return this.mapCourse(response.json());
      });
  }

  private mapCourse(object: any): Course {
    return new Course(object.id,
      object.name,
      object.length,
      moment(object.date).toDate(),
      object.description,
      object.isTopRated);
  }
  private remapCourse(course: Course): any {
    return {
      id: course.id,
      name: course.name,
      description: course.description,
      length: course.duration,
      date: course.date,
      isTopRated: course.topRated
    };
  }
}
