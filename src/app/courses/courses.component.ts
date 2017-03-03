import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Courses` component');
  }

}
