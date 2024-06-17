import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { PdfViewerModule } from "ng2-pdf-viewer";

import { ComponentsModule } from '../../components/components.module';
import { ImageComponent } from '../../components/image/image.component';
import { CardComponent } from './card/card.component';
import { ReportComponent } from './report.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FrameComponent } from './frame/frame.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    ReportComponent,
    CardComponent,
    FrameComponent,
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    ComponentsModule,
    PdfViewerModule,

    // standalone
    ImageComponent
  ],
  exports: [
    ReportComponent,
    CardComponent,
    FrameComponent,
    PdfViewerComponent
  ]
})
export class ReportModule {}
