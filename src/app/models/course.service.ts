import { Injectable } from '@angular/core';
import { Course } from './course.model';
import moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class CourseService {
  public actualCourses: Observable<Course[]>;
  private actualCoursesSubject: BehaviorSubject<Course[]>;
  private courses: any;

  constructor() {
    this.courses = {};

    let course1 = new Course('Course #1', 30, moment().add(-7, 'days').toDate(),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Pellentesque condimentum leo consectetur sagittis eleifend. ' +
      'Donec nec tellus mollis, accumsan arcu vel, posuere eros. ' +
      'Morbi vel hendrerit urna. Nam auctor varius venenatis. ' +
      'Donec malesuada ante a vulputate sagittis. ' +
      'Donec consequat magna et nunc fermentum finibus. ' +
      'Proin sapien odio, malesuada in faucibus tempus, aliquam nec turpis.', true);
    this.courses[course1.id] = course1;

    let course2 = new Course('Course #2', 90, moment().add(7, 'days').toDate(),
      'Quisque consectetur neque sed nunc auctor consectetur. ' +
      'Duis non mollis purus, vel fermentum nunc. ' +
      'Nulla ut euismod nunc. Curabitur eu ex viverra, dapibus mauris quis, placerat nisi. ' +
      'Duis porta placerat lacus a elementum. ' +
      'Integer volutpat, nisl id posuere pellentesque, lectus arcu efficitur justo, ' +
      'vel fermentum risus arcu eu nisi. In sagittis lectus vitae risus molestie, ' +
      'non blandit sapien fermentum. Proin nec vestibulum erat. Praesent porta hendrerit ' +
      'magna ac consectetur. Donec rhoncus sed nibh ut rutrum.');
    this.courses[course2.id] = course2;

    let course3 = new Course('Course #3', 60, moment().add(-15, 'days').toDate(),
      'Vestibulum sed lectus non velit interdum venenatis. ' +
      'Sed vel quam vel nisl laoreet suscipit vel rutrum risus. ' +
      'Vivamus nec efficitur neque. Ut rhoncus dolor eu fringilla porta. ' +
      'Suspendisse ut quam sem. Fusce pellentesque ligula malesuada, vehicula tortor eget, ' +
      'tempor odio. Morbi vel neque id nisl vestibulum hendrerit. ' +
      'Aenean vulputate turpis vel turpis tempus placerat. ' +
      'Aenean quis consectetur lectus, sit amet dignissim lacus. ' +
      'Aenean hendrerit ornare ligula, auctor facilisis turpis. ' +
      'Vivamus porttitor sed tortor a dignissim. ' +
      'Curabitur vel turpis dignissim, ultrices ante sed, dignissim orci.');
    this.courses[course3.id] = course3;
    this.actualCoursesSubject = new BehaviorSubject(this.getCourses());
    this.actualCourses = this.actualCoursesSubject.asObservable();
  }

  public getCourses(sortBy: string = 'date'): Course[] {
    return Object.keys(this.courses)
      .map((id) => this.courses[id])
      .filter((course) => moment(course.date).diff(moment(), 'days') > -14)
      .sort((a, b) => a[sortBy] - b[sortBy]);
  }

  public getCourse(id: string): Observable<Course> {
    console.log(`get course ${JSON.stringify(this.courses[id])}`);
    return Observable.from(this.courses[id]);
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
