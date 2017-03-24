import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header';
import { BreadcrumbComponent } from './header/breadcrumb/';
import { FooterComponent } from './footer';
import { LoginModule } from '../login/login.module';
import { LoaderComponent } from './loader';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent,
    LoaderComponent
  ],
})
export class CoreModule {

}
