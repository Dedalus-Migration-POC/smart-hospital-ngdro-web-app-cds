import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportDocument, ReportRequest} from '../../models/report';

@Component({
  selector: 'app-list-pdf',
  templateUrl: './list-pdf.component.html',
  styleUrls: ['./list-pdf.component.scss']
})
export class ListPdfComponent implements OnInit {
  @Input() list!: Array<ReportDocument>;
  @Output() showPdf: EventEmitter<ReportDocument> = new EventEmitter<ReportDocument>();

  selectedPdf: ReportDocument | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.selectedPdf = this.list[0];
  }

  selectPdf(pdf: ReportDocument): void {
    this.selectedPdf = pdf;

    this.showPdf.emit(pdf);
  }
}
