import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReportDocument, ReportRequest} from '../../models/report';

@Component({
  selector: 'app-list-pdf',
  templateUrl: './list-pdf.component.html',
  styleUrls: ['./list-pdf.component.scss']
})
export class ListPdfComponent {
  @Input() list!: Array<ReportDocument>;
  @Output() showReport: EventEmitter<ReportDocument> = new EventEmitter<ReportDocument>();

  viewPdf(pdf: ReportDocument) {
    this.showReport.emit(pdf);
  }
}
