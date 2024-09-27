import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

import {
  ReportRequest,
  PdfRequest,
  PdfReport,
  LinkExternalDicom,
  ReportSummary,
} from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly BASE_URL = 'health-repository/api/archive';

  constructor(private http: HttpClient) {}

  findReports(request: ReportRequest): Observable<ReportSummary> {
    return this.http
      .post<ReportSummary>(`${this.BASE_URL}/find-documents`, request)
      .pipe(
        map((response) => {
          if (response) {
            return response;
          } else {
            console.error('Invalid response findReports');
            throw new Error('Invalid response: reportSummary is undefined');
          }
        })
      );
  }

  getPdf(request: PdfRequest): Observable<PdfReport> {
    return this.http.post<PdfReport>(
      `${this.BASE_URL}/retrieve-document`,
      request
    );
  }

  getExternalDicom(request: PdfRequest): Observable<LinkExternalDicom> {
    return this.http.post<LinkExternalDicom>(
      `${this.BASE_URL}/retrieve-document`,
      request
    );
  }
}
