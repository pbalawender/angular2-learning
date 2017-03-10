import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './login.routes';

import { LoginComponent } from './login.component';
import { LoginIndicatorComponent } from './login-indicator/login-indicator.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginIndicatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginIndicatorComponent
  ]
})
export class LoginModule {

}
