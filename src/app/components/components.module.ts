import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { CardReportComponent } from './card-report/card-report.component';
import { FaqComponent } from './faq/faq.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { ListPdfComponent } from './list-pdf/list-pdf.component';
import { FrameComponent } from './frame/frame.component';
import { PdfViewerModule } from "ng2-pdf-viewer";

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    CardReportComponent,
    FaqComponent,
    ModalComponent,
    LoadSpinnerComponent,
    PdfViewerComponent,
    ListPdfComponent,
    FrameComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  exports: [
    LanguageSelectorComponent,
    CardReportComponent,
    FaqComponent,
    ModalComponent,
    LoadSpinnerComponent,
    PdfViewerComponent,
    ListPdfComponent,
    FrameComponent
  ]
})
export class ComponentsModule {}

