import { CoursesComponent } from './courses.component';
import { CourseEditComponent } from './course-edit';

export const routes = [
  { path: '',  component: CoursesComponent },
  { path: 'add', component: CourseEditComponent },
  { path: 'edit/:id', component: CourseEditComponent }
];
