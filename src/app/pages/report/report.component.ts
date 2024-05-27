import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

import { PdfDocument, PdfRequest, ReportDocument, ReportRequest } from '../../models/report';
import { SessionService } from '../../services/session.service';
import { ReportService } from "../../services/report.service";

export enum ViewMode {
  IMAGE = 'IMAGE',
  PDF_SINGLE = 'PDF_SINGLE',
  PDF_MULTI = 'PDF_MULTI',
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  patient: ReportRequest | null;
  reportDocument: ReportDocument | null = null;
  pdfDocument: PdfDocument | null = null;
  releaseDateObj: { date: string, time: string } | undefined;
  ViewMode = ViewMode;
  view: { returnTo: ViewMode | null; current: ViewMode | null; };

  isLoading: boolean = false;

  constructor(private sessionService: SessionService,
              private router: Router,
              private reportService: ReportService) {
    this.patient = this.sessionService.getData('patient');
    this.view = {
      returnTo: null,
      current: null
    }
  }

  ngOnInit(): void {
    this.reportDocument = this.sessionService.getData('report');
    this.releaseDateObj = this.getFormatData(this.reportDocument?.releaseDate!);

    this.initCurrentView();
  }

  getValues(obj: Record<string, string>): string[] {
    return obj ? Object.values(obj) : [];
  }

  goBack(): void {
    if (this.view.returnTo) {
      this.view.current = this.view.returnTo;
      this.view.returnTo = null;
    } else {
      this.router.navigate(['/']);
    }
  }

  getPdfDocument(documentId: string): void {
    this.isLoading = true;

    if (this.view.current === ViewMode.IMAGE) {
      this.changeViewImgToPdf();
    }

    const request = this.setPdfRequest(documentId);
    if (request) {
      this.reportService.getPdfDocument(request).subscribe({
        next: (data: PdfDocument ) => {
          this.isLoading = false;

          if (data) {
            this.pdfDocument = data;
          }
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  // Pdf selected from a list of pdf (PDF_MULTI)
  showPdf(report: ReportDocument): void {
    if (!report) { return; }

    this.getPdfDocument(report.documentId);
  }

  // Formats the date to be passed as a param in the translate (i18n)
  private getFormatData(data: string): { date: string, time: string } | undefined {
    if (!data) { return; }

    const date = parseISO(data);
    const formattedDate = format(date, 'dd MMM yyyy', { locale: it });
    const formattedTime = format(date, 'HH:mm');

    return { date: formattedDate, time: formattedTime };
  }

  private setPdfRequest(documentId: string): PdfRequest | undefined {
    if (!this.patient || !documentId) { return; }

    const pdfRequest: PdfRequest = { ...this.patient,
                                     documentId };

    if (this.reportDocument && this.reportDocument.repositoryId) {
      pdfRequest['repositoryId'] = this.reportDocument.repositoryId;
    }

    return pdfRequest;
  }

  // Init display mode between values enum ViewMode
  private initCurrentView() {
    if (this.reportDocument?.mimeType === 'application/dicon') {
      if (this.reportDocument?.additionalInfo && Object.keys(this.reportDocument.additionalInfo).length > 0) {
        this.view.current = ViewMode.IMAGE;
      }
    } else if (this.reportDocument?.mimeType === 'application/pdf') {
      this.view.current = (this.reportDocument?.relatedDocuments && this.reportDocument?.relatedDocuments.length > 0) ? ViewMode.PDF_MULTI
                                : ViewMode.PDF_SINGLE ;
    }
  }

  // Change the display mode: IMAGE to PDF (checking if single or multi)
  private changeViewImgToPdf() {
    if (this.reportDocument?.relatedDocuments) {
      const numPdf = this.reportDocument?.relatedDocuments.length;
      this.view.current = numPdf === 1 ? ViewMode.PDF_SINGLE : (numPdf > 1 ? ViewMode.PDF_MULTI : null);
      this.view.returnTo = ViewMode.IMAGE;
    }
  }
}
