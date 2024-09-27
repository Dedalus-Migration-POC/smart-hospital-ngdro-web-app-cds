import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ReportRequest, ReportSummary } from '../../models/report';
import { ReportService } from '../../services/report.service';
import { SessionService } from '../../services/session.service';
import { Type } from '../../models/modal-alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private reportService: ReportService,
    private sessionService: SessionService,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.sessionService.clearAll();
  }

  getReport(formData: ReportRequest) {
    if (!formData) {
      return;
    }

    this.isLoading = true;

    this.reportService.findReports(formData).subscribe({
      next: (data: ReportSummary) => {
        this.isLoading = false;

        if (data && data.documents.length === 0) {
          this.modalService.open(this.viewContainerRef, {
            type: Type.WARNING,
            title: this.translateService.instant('warning'),
            body: this.translateService.instant(
              'home.cardReport.form.emptyListReport'
            ),
            icon: ['fas', 'circle-exclamation'],
            iconClass: 'text-brown',
            centered: true,
          });
        } else {
          this.sessionService.saveReportSummary('reportSummary', data);

          if (data.documents.length === 1) {
            this.router.navigate(['/report', data.documents[0].documentId]);
          } else if (data.documents.length > 1) {
            this.router.navigate(['/list-report']);
          }
        }
      },
      error: () => {
        this.isLoading = false;

        this.modalService.open(this.viewContainerRef, {
          type: Type.WARNING,
          title: this.translateService.instant('warning'),
          body: this.translateService.instant('home.cardReport.form.notFound'),
          centered: true,
          icon: ['fas', 'circle-exclamation'],
          iconClass: 'text-brown',
        });
      },
    });
  }
}
