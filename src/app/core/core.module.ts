import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './header/breadcrumb/';
import { FooterComponent } from './footer/footer.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
})
export class CoreModule {

}
