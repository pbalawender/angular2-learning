import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Course } from '../../models';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  @Input() public course: Course;
  @Output() public onEdit = new EventEmitter();
  @Output() public onDelete = new EventEmitter();

  public ngOnInit() {
    // now it is not empty
  }

}
