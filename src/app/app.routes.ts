import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './models/auth.guard';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', loadChildren: './courses#CoursesModule', canActivate: [AuthGuard] },
  { path: '**',    component: NoContentComponent },
];
