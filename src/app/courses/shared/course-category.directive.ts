import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import moment from 'moment';

@Directive({
  selector: '[courseCategory]'
})
export class CourseCategoryDirective implements OnInit {
  @Input('course') public course: Course;

  constructor(private element: ElementRef) {
  }

  public ngOnInit() {
    const now = moment();
    const courseDate = moment(this.course.date);
    if (courseDate > now) {
      this.setBorder('blue');
    } else if (courseDate < now && Math.abs(courseDate.diff(now, 'days')) <= 14) {
      this.setBorder('green');
    }
  }

  private setBorder(color: string) {
    if (color) {
      this.element.nativeElement.parentNode.style.border = `1px solid ${color}`;
    }
  }
}
