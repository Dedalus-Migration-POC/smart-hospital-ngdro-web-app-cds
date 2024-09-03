import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

import { Report, ReportStatus } from '../../models/report';
import { SessionService } from '../../services/session.service';
import { Alert, Type } from '../../models/modal-alert';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss'],
})
export class ListReportComponent implements OnInit {
  reports: Array<Report> = [];
  hasPartialReports: boolean = false;
  alertReportPartial!: Alert;

  ReportStatus = ReportStatus;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.reports = this.sessionService.getReports('reports');
    this.checkPartialReports();
  }

  checkPartialReports(): void {
    this.hasPartialReports = this.reports.some(
      (report) =>
        report?.additionalInfo?.['result-status'] === ReportStatus.PARTIAL
    );

    this.translateService.get('report.statusPartial.title').subscribe(() => {
      this.alertReportPartial = {
        title: this.translateService.instant('report.statusPartial.title'),
        body: this.translateService.instant(
          'report.statusPartial.list-report-content'
        ),
        icon: ['fas', 'circle-exclamation'],
        iconClass: 'text-brown',
        type: Type.WARNING,
        styleClass: 'mx-2 my-0',
      };
    });
  }

  formatDate(date: string): string {
    if (!date || date.trim().length === 0) {
      return '';
    }

    return format(new Date(date), 'dd/MM/yyyy');
  }

  goToReport(reportId: string): void {
    this.router.navigate(['/report', reportId]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
