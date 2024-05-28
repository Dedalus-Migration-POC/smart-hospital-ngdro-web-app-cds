import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ReportDocument, ReportRequest } from '../../models/report';
import { ReportService } from '../../services/report.service';
import { SessionService } from '../../services/session.service';
import { Type } from '../../models/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router,
              private reportService: ReportService,
              private sessionService: SessionService,
              private modalService: ModalService,
              private viewContainerRef: ViewContainerRef,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.sessionService.clearAll();
  }

  getReport(formData: ReportRequest) {
    if (!formData) { return; }

    this.isLoading = true;

    this.reportService.findReports(formData).subscribe({
      next: (data: Array<ReportDocument> ) => {
        this.isLoading = false;

        if (data) {
          this.sessionService.saveData<ReportRequest>('patient', formData);
          this.sessionService.saveData<ReportDocument>('report', data[0]);
          this.router.navigate(['/report']);
        }
      },
      error: () => {
        this.isLoading = false;

        this.modalService.open(this.viewContainerRef, {
          type: Type.ERROR,
          title: this.translateService.instant('home.cardReport.form.error.title'),
          body: this.translateService.instant('home.cardReport.form.error.reportNotFound'),
          centered: true
        });
      }
    });
  }
}
