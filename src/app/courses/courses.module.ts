import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { routes } from './courses.routes';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details';

import { CourseCategoryDirective } from './shared/course-category.directive';
import { DurationPipe } from './shared/duration.pipe';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { AuthorsSelectComponent } from './shared/authors-select/authors-select.component';
import { NotEmptyAuthorsDirective } from './shared/validators/not-empty-authors.directive';
import { ValidDurationDirective } from './shared/validators/valid-duration.directive';
import { ValidDateDirective } from './shared/validators/valid-date.directive';

@NgModule({
  bootstrap: [
    CoursesComponent
  ],
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    CourseEditComponent,
    CourseCategoryDirective,
    DurationPipe,
    DatePickerComponent,
    AuthorsSelectComponent,
    NotEmptyAuthorsDirective,
    ValidDurationDirective,
    ValidDateDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2Bs3ModalModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class CoursesModule {
  constructor() {
    // not empty
  }
}
