import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

import {
  ReportStatus,
  ReportSummary,
  ReportWorkflowStatus,
} from '../../models/report';
import { SessionService } from '../../services/session.service';
import { Alert, Type } from '../../models/modal-alert';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss'],
})
export class ListReportComponent implements OnInit {
  reportSummary!: ReportSummary;
  alert!: Alert;

  ReportStatus = ReportStatus;
  ReportWorkflowStatus = ReportWorkflowStatus;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.reportSummary = this.sessionService.getReportSummary('reportSummary');
    if (this.reportSummary.resultStatus === ReportStatus.PARTIAL) {
      this.setAlertReportsUnvailable();
    }
  }

  setAlertReportsUnvailable(): void {
    // some reports are not available, e.g., out of a list of 3 documents only 2 are ready
    this.alert = {
      title: this.translateService.instant('list-report.unvailable.title'),
      body: this.translateService.instant('list-report.unvailable.content'),
      icon: ['fas', 'circle-exclamation'],
      iconClass: 'text-brown',
      type: Type.WARNING,
      styleClass: 'mx-2 my-0',
    };
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
