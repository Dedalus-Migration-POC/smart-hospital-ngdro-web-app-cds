import { Injectable } from '@angular/core';

import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  saveReports(key: string, value: Array<Report>): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getReports(key: string): Array<Report> {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  getReportCount(key: string): number {
    const reports = this.getReports(key);
    return reports.length;
  }

  removeReports(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearAll(): void {
    sessionStorage.clear();
  }
}
