import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import {
  HttpAuthService,
  ILoginResponse,
  ITfaLoginResponse,
  ITfaRequestLoginData,
} from '@ngdro/ngx-uaa-services';
import { FormValidationUtils } from '../utils/form-validation-utils';
import { WebChannel } from '../mobile/web-channel';
import { Logger } from '../mobile/logger';
import { CookieKey, CookieUtils } from '../utils/cookie-utils';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpAuthService: HttpAuthService) {}

  loginForm = new FormGroup({
    fiscalCode: new FormControl(null as string | null, [
      Validators.required,
      FormValidationUtils.fiscalCodeValidator,
    ]),
    password: new FormControl(null as string | null, [Validators.required]),
  });

  otpForm = new FormGroup<{ code: FormControl<string | null> }>({
    code: new FormControl(null),
  });

  sendLoginRequest(
    onSuccess: (response: ILoginResponse) => void,
    onError: VoidFunction
  ) {
    WebChannel.postString('closeKeyboard');
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.httpAuthService
        .login({
          username: this.loginForm.value.fiscalCode!.trim(),
          password: this.loginForm.value.password!,
        })
        .pipe(
          catchError(() => {
            onError();
            return EMPTY;
          })
        )
        .subscribe(onSuccess);
    }
  }

  sendOtpRequest(
    onSuccess: (response: ITfaLoginResponse) => void,
    onError: (err: any) => void
  ) {
    Logger.log('Sending TFA code');
    WebChannel.postString('closeKeyboard');
    this.httpAuthService
      .tfaLogin(this.otpForm.value as ITfaRequestLoginData)
      .pipe(
        catchError((err) => {
          onError(err);
          return EMPTY;
        })
      )
      .subscribe(onSuccess);
    Logger.log('TFA code flow finish');
  }

  requestNewOtp(onSuccess: VoidFunction, onError: VoidFunction) {
    CookieUtils.remove(CookieKey.tfaToken);
    this.otpForm.controls.code.reset();
    this.sendLoginRequest(onSuccess, onError);
  }
}
