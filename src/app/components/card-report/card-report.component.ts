import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.scss'
})
export class CardReportComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      pickupCode: new FormControl('', Validators.required),
      fiscalCode: new FormControl({ value: '', disabled: true }, Validators.required)
    });
  }

  ngOnInit() {
    this.form.get('pickupCode')?.valueChanges.subscribe(value => {
      const fiscalControl = this.form.get('fiscalCode');
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
      console.log(this.form.value);
    }
  }
}
