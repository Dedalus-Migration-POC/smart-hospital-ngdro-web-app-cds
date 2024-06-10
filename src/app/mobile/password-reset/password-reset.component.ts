import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormValidationUtils,
  PasswordValidator,
} from '../../utils/form-validation-utils';
import { WebChannel } from '../web-channel';
import { catchError, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes.module';
import { MobileButtonComponent } from '../components/mobile-button/mobile-button.component';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    PipesModule,
    MobileButtonComponent,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute
  ) {
    this.passwordRestoreForm = new FormGroup(
      {
        password1: new FormControl(null as string | null, [
          Validators.required,
          FormValidationUtils.passwordValidator,
        ]),
        password2: new FormControl(null as string | null, [
          Validators.required,
        ]),
      },
      [PasswordValidator.matchValidator('password1', 'password2')]
    );
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
  }

  passwordRestoreForm: FormGroup<{
    password1: FormControl<string | null>;
    password2: FormControl<string | null>;
  }>;

  key?: string | null;
  error = false;
  password1hidden = true;
  password2hidden = true;

  window = window;

  onSubmit() {
    WebChannel.postString('closeKeyboard');
    this.passwordRestoreForm.markAllAsTouched();
    if (this.passwordRestoreForm.valid) {
      this.http
        .post('uaa/api/profile/reset-password', {
          key: this.key,
          password: this.passwordRestoreForm.controls.password2.value,
        })
        .pipe(
          map(() => {
            WebChannel.postString('passwordRestoreRequestSuccess');
            this.router.navigate(['success'], {
              relativeTo: this.activatedRoute,
            });
          }),
          catchError(() => {
            this.error = true;
            return of(null);
          })
        )
        .subscribe();
    }
  }

  focusNext() {
    // @ts-ignore
    document.querySelector('#password2')!.focus();
  }

  closeKeyboard() {
    WebChannel.postString('closeKeyboard');
  }
}
