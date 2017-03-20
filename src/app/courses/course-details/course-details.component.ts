import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
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

  @ViewChild('deleteModal')
  public modal: ModalComponent;

  public close() {
    this.modal.close();
  }

  public openModal() {
    console.log('Open modal');
    if (this.modal) {
      this.modal.open();
    }
  }

  public ngOnInit() {
    // now it is not empty
  }

}
