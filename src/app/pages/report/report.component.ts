import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { it } from 'date-fns/locale';

import { Report, MimeTypeEnum, PdfReport, Repository, Dicom, LinkExternalDicom } from '../../models/report';
import { SessionService } from '../../services/session.service';
import { ReportService } from '../../services/report.service';
import { format, parseISO } from 'date-fns';
import {Type} from "../../models/modal";
import {TranslateService} from "@ngx-translate/core";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  report: Report | undefined;
  selectedReport: Report | undefined;

  pdf: PdfReport | undefined;
  dicom: Dicom | undefined;

  MimeTypeEnum = MimeTypeEnum;
  Repository = Repository;

  loadingReport = false;
  hasDicom: boolean = false;
  releaseDate: { date: string, time: string } | undefined;

  constructor(private sessionService: SessionService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private reportService: ReportService,
              private modalService: ModalService,
              private viewContainerRef: ViewContainerRef,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const reportId = params.get('id');
      if (reportId) {
        const reports = this.sessionService.getReports('reports');
        if (reports) {
          this.report = reports.find(report => report.documentId === reportId);
          if (this.report) {
            this.hasDicom = !!(this.report.relatedDocuments && this.report.relatedDocuments.length > 0);
            if (!this.hasDicom) { // only pdf
              this.releaseDate = this.getFormatData(this.report?.releaseDate!);
              this.getPdf(this.report);
            }
          } else {
            console.error('Report not found');
          }
        }
      }
    });
  }

  goBack(): void {
    const reportCount = this.sessionService.getReportCount('reports');
    if (reportCount > 1) {
      this.router.navigate(['/list-report']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  showReport(report: Report): void {
    if (!report) {
      console.error('Report not defined');
      return;
    }

    this.selectedReport = report;
    this.loadingReport = true;

    if (report.mimeType === MimeTypeEnum.PDF) {
      this.getPdf(report);
    } else if (report.mimeType === MimeTypeEnum.DICOM) {
      this.getDicom(report);
    }
  }

  getPdf(report: Report): void {
    this.reportService.getPdf({
      documentId: report.documentId,
      repositoryId: report.repositoryId
    }).subscribe({
      next: (data: PdfReport) => {
        this.loadingReport = false;

        if (data)
          this.pdf = data;
      },
      error: () => {
        this.loadingReport = false;

        this.modalService.open(this.viewContainerRef, {
          type: Type.WARNING,
          title: this.translateService.instant('warning'),
          body: this.translateService.instant('report.notFound'),
          centered: true
        });
      }
    });
  }

  getDicom(report: Report): void {
    if (report.repositoryId === Repository.EXTERNAL_DICOM) {
      this.reportService.getExternalDicom({
        documentId: report.documentId,
        repositoryId: report.repositoryId
      }).subscribe({
        next: (data: LinkExternalDicom) => {
          this.loadingReport = false;
          if (data && data.body.downloadUrl) {
            this.dicom = {
              name: report.name,
              url: data.body.downloadUrl
            };
          }
        },
        error: () => {
          this.loadingReport = false;

          this.modalService.open(this.viewContainerRef, {
            type: Type.WARNING,
            title: this.translateService.instant('warning'),
            body: this.translateService.instant('report.externalDicomError'),
            centered: true
          });
        }
      });
    } else {
      this.loadingReport = false;
      this.dicom = {
        name: report.name,
        url: report?.referenceId ?? ''
      };
    }
  }

  private getFormatData(data: string): { date: string, time: string } | undefined {
    if (!data) { return; }

    const date = parseISO(data);
    const formattedDate = format(date, 'dd MMM yyyy', { locale: it });
    const formattedTime = format(date, 'HH:mm');

    return { date: formattedDate, time: formattedTime };
  }
}
