import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './header/breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
})
export class CoreModule {

}
