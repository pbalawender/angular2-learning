import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './courses.routes';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details';

import { CourseService } from '../models/';

@NgModule({
  bootstrap: [
    CoursesComponent
  ],
  declarations: [
    CoursesComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CourseService
  ]
})
export class CoursesModule {
  constructor() {
    // not empty
  }
}
