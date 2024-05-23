import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { fiscalCodeValidator } from '../../validators/fiscalCode.validator';
import { ReportRequest } from '../../models/report';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.scss'
})
export class CardReportComponent implements OnInit {
  @Output() patientReport: EventEmitter<ReportRequest> = new EventEmitter<ReportRequest>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      securityCode: new FormControl('', Validators.required),
      patientId: new FormControl({ value: '', disabled: true }, [ Validators.required, fiscalCodeValidator()])
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
      this.patientReport.emit(this.form.value);
    }
  }
}
