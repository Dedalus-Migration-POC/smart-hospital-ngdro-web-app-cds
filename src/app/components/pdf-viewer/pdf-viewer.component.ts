import { Component, Input, OnInit } from '@angular/core';

import printJS from 'print-js';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @Input({ required: true, alias: 'pdfBase64' }) pdfBase64!: string | undefined;
  @Input({ required: true, alias: 'fileName' }) fileName!: string | undefined;
  @Input({ required: true, alias: 'mimeType' }) mimeType!: string | undefined;

  pdfSrc: string = '';

  constructor() {}

  printPDF(): void {
    printJS({ printable: this.pdfBase64, type: 'pdf', base64: true });
  }

  downloadPDF(): void {
    if (this.pdfBase64) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${this.pdfBase64}`;
      link.download = this.fileName ? this.fileName + '.pdf' : 'report.pdf';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  }

  ngOnInit(): void {
    this.pdfSrc = `data:${this.mimeType};base64,${this.pdfBase64}`;
  }
}
