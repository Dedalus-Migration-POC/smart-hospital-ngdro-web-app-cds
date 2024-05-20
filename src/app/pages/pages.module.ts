import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './home/home.component';
import { NewlineToBrPipe } from '../utils/pipes/newline-to-br.pipe';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    NewlineToBrPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule

    // RouterModule
  ]
})
export class PagesModule { }

