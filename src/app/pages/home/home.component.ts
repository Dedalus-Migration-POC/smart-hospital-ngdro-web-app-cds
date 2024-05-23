import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

import { ReportDocument, ReportRequest } from '../../models/report';
import { ReportService } from '../../services/report.service';
import { SessionService } from "../../services/session.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router,
              private reportService: ReportService,
              private sessionService: SessionService) {}

  // openModal() {
  //   const modalData: Modal = {
  //     type: Type.INFO,
  //     title: 'Informazioni Importanti',
  //     contentBody: 'Questo è il corpo principale del modale.',
  //     contentFooter: 'Piede del modale con ulteriori informazioni o azioni.'
  //   };
  //   this.modalService.open(this.viewContainerRef, modalData);
  // }

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
      error: (error) => {
        console.error('Error:', error);
        // Qui gestisci il caso di errore
      }
    });
  }

  ngOnInit(): void {
    this.sessionService.clearAll();
  }
}
