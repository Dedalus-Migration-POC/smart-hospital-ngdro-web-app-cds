import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';

import { Report } from '../../models/report';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.component.html',
  styleUrls: ['./list-report.component.scss']
})
export class ListReportComponent implements OnInit {

  reports: Array<Report> = [];

  constructor(private sessionService: SessionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.reports = this.sessionService.getReports('reports');
  }

  formatDate(date: string): string {
    if (!date || date.trim().length === 0) { return ''; }

    return format(new Date(date), 'dd/MM/yyyy');
  }

  goToReport(reportId: string): void {
    this.router.navigate(['/report', reportId]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
