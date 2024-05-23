import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { NewlineToBrPipe } from '../utils/pipes/newline-to-br.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ReportComponent,

    NewlineToBrPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class PagesModule { }

