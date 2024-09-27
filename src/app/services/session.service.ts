import { Injectable } from '@angular/core';

import { ReportSummary } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  saveReportSummary(key: string, value: ReportSummary): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getReportSummary(key: string): ReportSummary {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  getReportCount(key: string): number {
    const reportSummery = this.getReportSummary(key);
    if (reportSummery.documents) {
      return reportSummery.documents.length;
    }

    return 0;
  }

  clearAll(): void {
    sessionStorage.clear();
  }
}
