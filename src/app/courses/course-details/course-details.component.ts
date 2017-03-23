import { Component, Input, Output, EventEmitter,
  ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Course } from '../../models';

@Component({
  selector: 'course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsComponent {
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
}
