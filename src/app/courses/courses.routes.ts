import { CoursesComponent } from './courses.component';

export const routes = [
  { path: '', children: [
    { path: '', component: CoursesComponent },
  ]},
];
