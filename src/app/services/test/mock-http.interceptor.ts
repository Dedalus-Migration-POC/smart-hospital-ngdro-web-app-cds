import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  mockFindReportDocumentFrame, mockFindReportDocumentPdf,
  mockFindReportDocumentMultiPdf, mockRetrievePdfDocument
} from './mock-response';
import { ReportDocument } from '../../models/report';

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // REPORT
    if (req.url.endsWith('/api/archive/find-documents')) {
      if (req.params.get('forceError') === 'true') {
        const errorResponse = new HttpErrorResponse({
          status: 500,
          statusText: 'Internal Server Error',
          url: req.url
        });
        return throwError(() => errorResponse).pipe(delay(4000));
      }

      const mockResponse = new HttpResponse<{ documents: Array<ReportDocument> }>({
        status: 200,
        body: mockFindReportDocumentMultiPdf
      });

      return of(mockResponse).pipe(delay(2000));
    }

    // PDF
    if (req.url.endsWith('/api/archive/retrieve-document')) {
      if (req.params.get('forceError') === 'true') {
        const errorResponse = new HttpErrorResponse({
          status: 400,
          statusText: 'Bad Request',
          url: req.url
        });
        return throwError(() => errorResponse);
      } else {
        const mockResponse = new HttpResponse({
          status: 200,
          body: mockRetrievePdfDocument
        });
        return of(mockResponse).pipe(delay(2000));
      }
    }

    return next.handle(req);
  }
}
