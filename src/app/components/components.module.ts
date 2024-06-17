import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './modal/modal.component';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';

@NgModule({
  declarations: [
    ModalComponent,
    LoadSpinnerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule
  ],
  exports: [
    ModalComponent,
    LoadSpinnerComponent
  ]
})
export class ComponentsModule {}

