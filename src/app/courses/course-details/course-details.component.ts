import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  @Input() public course: Course;

  public ngOnInit() {
    console.log('hello `Course` component');
  }

}
