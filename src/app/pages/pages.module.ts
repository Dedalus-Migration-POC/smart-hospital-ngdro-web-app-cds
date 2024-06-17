import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { HomeModule } from './home/home.module';
import { ListReportComponent } from './list-report/list-report.component';
import { ImageComponent } from '../components/image/image.component';
import { ReportModule } from './report/report.module';

@NgModule({
  declarations: [
    ListReportComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    RouterModule,
    ComponentsModule,
    HomeModule,
    ReportModule,

    // standalone
    ImageComponent
  ],
  exports: [
    ListReportComponent
  ]
})
export class PagesModule {}
