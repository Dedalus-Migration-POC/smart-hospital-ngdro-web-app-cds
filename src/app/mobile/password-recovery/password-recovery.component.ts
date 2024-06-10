import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormValidationUtils } from '../../utils/form-validation-utils';
import { WebChannel } from '../web-channel';
import { EMPTY, catchError, finalize, map } from 'rxjs';
import { Logger } from '../logger';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes.module';
import { MobileButtonComponent } from '../components/mobile-button/mobile-button.component';
import { DirectivesModule } from '../../directives.module';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    PipesModule,
    DirectivesModule,
    MobileButtonComponent,
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
})
export class PasswordRecoveryComponent implements OnInit {
  passwordRecoveryForm: FormGroup<{
    value: FormControl<string | null>;
  }>;
  loading = false;
  printPasswordSent = false;
  window = window;
  fromApp = false;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.passwordRecoveryForm = new FormGroup({
      value: new FormControl(null as string | null, [
        Validators.required,
        FormValidationUtils.fiscalCodeValidator,
      ]),
    });
    this.fromApp = WebChannel.isPresent;
  }

  ngOnInit(): void {
    WebChannel.postObject(
      'setPageTitle',
      "Inserisci il tuo codice fiscale. Riceverai un'email con le istruzioni per creare la tua nuova password."
    );
  }

  onSubmit() {
    WebChannel.postString('closeKeyboard');
    this.passwordRecoveryForm.markAllAsTouched();
    if (this.passwordRecoveryForm.valid) {
      this.loading = true;
      this.http
        .post('uaa/api/reset-password', {
          value: this.passwordRecoveryForm.controls.value.value!.trim(),
          noRobotCode: '',
          strategy: 'USERNAME',
        })
        .pipe(
          map((res) => {}),
          catchError((err) => {
            Logger.log(err);
            return EMPTY;
          }),
          finalize(() => {
            this.loading = false;
            WebChannel.postString('passwordRestoreRequestSuccess');
            if (!WebChannel.isPresent) {
              this.printPasswordSent = true;
            }
          })
        )
        .subscribe();
    }
  }
}
