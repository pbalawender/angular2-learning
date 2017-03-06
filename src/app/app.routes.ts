import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', loadChildren: './courses#CoursesModule' },
  { path: 'login', loadChildren: './login#LoginModule' },
  { path: '**',    component: NoContentComponent },
];
