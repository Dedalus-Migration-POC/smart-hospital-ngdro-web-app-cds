import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { PdfDocument, PdfDocumentRequest, ReportDocument, ReportRequest } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly BASE_URL = '/api/archive';

  constructor(private http: HttpClient) {}

  findReports(request: ReportRequest): Observable<Array<ReportDocument>> {
    return this.http.post<{ documents?: Array<ReportDocument> }>(
      `${this.BASE_URL}/find-documents`,
      request
    ).pipe(
      map(response => response.documents || [])
    );
  }

  getPdfDocument(request: PdfDocumentRequest): Observable<PdfDocument> {
    return this.http.post<PdfDocument>(
      `${this.BASE_URL}/retrieve-document`,
      request
    );
  }
}
