import { LoginComponent } from './login.component';

export const routes = [
  { path: '', children: [
    { path: '', component: LoginComponent },
  ]},
];
