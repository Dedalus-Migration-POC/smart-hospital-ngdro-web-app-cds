import { Component, Input, OnInit } from '@angular/core';

import printJS from 'print-js';

import { PdfReport } from '../../../models/report';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input({ required: true }) pdf!: PdfReport;

  pdfSrc: string = '';

  constructor() {}

  printPDF(): void {
    // encodedBase64 potrebbe mancare nella risposta API; content è sempre in base64, quindi il default è true
    printJS({ printable: this.pdf?.body.content, type: 'pdf', base64: this.pdf?.body.encodedBase64 ?? true });
  }

  downloadPDF(): void {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${this.pdf.body.content}`;
      link.download = this.pdf.body.fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
  }

  ngOnInit(): void {
    this.pdfSrc = "data:application/pdf;base64," + this.pdf.body.content;
  }
}
