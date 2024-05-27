import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { WebChannel } from '../web-channel';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Logger } from '../logger';
import { ITfaLoginResponse } from '@ngdro/ngx-uaa-services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes.module';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, PipesModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnDestroy, AfterContentInit {
  constructor(private loginService: LoginService, private router: Router) {
    this.setOtpInterval();
    this.loginService.otpForm.valueChanges.subscribe((form) => {
      this.canSubmit = form.code?.length === 5;
    });
  }

  ngAfterContentInit(): void {
    WebChannel.postObject(
      'setPageTitle',
      'Inserisci il codice OTP trasmesso alla mail inserita in fase di registrazione'
    );
    this.startInterval();
    window.scrollTo({ top: 0 });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  otpForm = this.loginService.otpForm;
  errorMessage: string | null = null;
  loading = false;
  canSubmit = false;
  interval!: number;
  timer: number | undefined;

  private setOtpInterval() {
    const newOtpInterval = window.localStorage.getItem('otpInterval');
    this.interval = newOtpInterval ? Number(newOtpInterval) : 90;
  }

  startInterval() {
    this.setOtpInterval();
    this.timer = window.setInterval(() => {
      this.interval = this.interval - 1;
      if (this.interval === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  otpResend() {
    this.loading = true;
    this.errorMessage = null;
    this.loginService.requestNewOtp(
      () => {
        this.loading = false;
        this.startInterval();
      },
      () => {
        this.loading = false;
        this.errorMessage =
          "E' avvenuto un errore. Se il problema persiste riprovare più tardi.";
      }
    );
  }

  onSubmit() {
    Logger.log('Sending TFA code');
    this.loading = true;
    WebChannel.postString('closeKeyboard');
    this.loginService.sendOtpRequest(this.onSuccess, (err) => {
      this.loading = false;
      this.errorMessage =
        err.status === 403
          ? 'Il codice inserito non risulta valido'
          : "E' avvenuto un errore. Se il problema persiste riprovare più tardi.";
    });
    Logger.log('TFA code flow finish');
  }

  onSuccess(response: ITfaLoginResponse) {
    this.loading = false;
    const returnUrl = new URLSearchParams(window.location.search).get(
      'returnUrl'
    );
    if (returnUrl) {
      if (returnUrl.startsWith('/uaa/') || returnUrl.startsWith('http')) {
        window.location.href = returnUrl;
      } else {
        this.router.navigateByUrl(returnUrl, { replaceUrl: true });
      }
    } else {
      this.errorMessage = 'Missing returnUrl parameter';
    }
  }
}
