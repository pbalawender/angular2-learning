import { Injectable } from '@angular/core';
import { Course } from './course.model';
import moment from 'moment';

@Injectable()
export class CourseService {
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

    let course2 = new Course('Course #2', 60, moment().add(7, 'days').toDate(),
      'Quisque consectetur neque sed nunc auctor consectetur. ' +
      'Duis non mollis purus, vel fermentum nunc. ' +
      'Nulla ut euismod nunc. Curabitur eu ex viverra, dapibus mauris quis, placerat nisi. ' +
      'Duis porta placerat lacus a elementum. ' +
      'Integer volutpat, nisl id posuere pellentesque, lectus arcu efficitur justo, ' +
      'vel fermentum risus arcu eu nisi. In sagittis lectus vitae risus molestie, ' +
      'non blandit sapien fermentum. Proin nec vestibulum erat. Praesent porta hendrerit ' +
      'magna ac consectetur. Donec rhoncus sed nibh ut rutrum.');
    this.courses[course2.id] = course2;

    let course3 = new Course('Course #3', 90, moment().add(-16, 'days').toDate(),
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
