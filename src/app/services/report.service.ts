import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Report, ReportRequest, PdfRequest, PdfReport, LinkExternalDicom } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly BASE_URL = 'health-repository/api/archive';

  constructor(private http: HttpClient) {}

  findReports(request: ReportRequest): Observable<Array<Report>> {
    return this.http.post<{ documents?: Array<Report> }>(
      `${this.BASE_URL}/find-documents`,
      request
    ).pipe(
      map(response => response.documents || [])
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
