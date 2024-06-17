import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Report } from '../../../models/report';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input({ required: true}) report!: Report;
  @Output() showReport: EventEmitter<Report> = new EventEmitter<Report>();

  dicoms: Array<Report> | null = null;
  pdf!: Omit<Report, 'relatedDocuments'>;

  selectedReport: Report | null = null;

  constructor() {
  }

  ngOnInit(): void {
    const { relatedDocuments, ...rest } = this.report;
    this.pdf = rest;

    this.dicoms = this.report?.relatedDocuments ?? null;
    this.selectedReport = this.dicoms?.[0] ?? null;

    if (this.selectedReport)
      this.showReport.emit(this.selectedReport);
  }

  selectReport(report: Report): void {
    this.selectedReport = report;

    this.showReport.emit(report);
  }
}
