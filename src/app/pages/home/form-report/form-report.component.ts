import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ReportRequest } from '../../../models/report';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrl: './form-report.component.scss'
})
export class FormReportComponent implements OnInit {
  @Output() patient: EventEmitter<ReportRequest> = new EventEmitter<ReportRequest>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      securityCode: new FormControl('', Validators.required),
      patientId: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
  }

  ngOnInit() {
    this.form.get('securityCode')?.valueChanges.subscribe(value => {
      const fiscalControl = this.form.get('patientId');
      if (fiscalControl) {
        if (value && value.trim() !== '') {
          fiscalControl.enable();
        } else {
          fiscalControl.disable();
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.patient.emit(this.form.value);
    }
  }
}
