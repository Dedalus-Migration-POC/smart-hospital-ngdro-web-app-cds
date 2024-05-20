import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { CardReportComponent } from './card-report/card-report.component';
import { FaqComponent } from './faq/faq.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    CardReportComponent,
    FaqComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    LanguageSelectorComponent,
    CardReportComponent,
    FaqComponent,
    ModalComponent
  ]
})
export class ComponentsModule {}

