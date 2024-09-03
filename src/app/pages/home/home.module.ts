import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { FormReportComponent } from './form-report/form-report.component';
import { FaqComponent } from './faq/faq.component';
import { ComponentsModule } from '../../components/components.module';
import { ImageComponent } from '../../components/image/image.component';

@NgModule({
  declarations: [HomeComponent, FormReportComponent, FaqComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ComponentsModule,

    // standalone
    ImageComponent,
  ],
  exports: [HomeComponent, FormReportComponent, FaqComponent],
})
export class HomeModule {}
