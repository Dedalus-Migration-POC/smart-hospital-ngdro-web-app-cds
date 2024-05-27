import { Component, Inject } from '@angular/core';
import { SignupButtonsComponent } from '../components/signup-buttons/signup-buttons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WebChannel } from '../web-channel';
import { LoginService } from '../../services/login.service';
import { DEPLOY_URL } from '../../../main';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SignupButtonsComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    PipesModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DEPLOY_URL) public deployUrl: string
  ) {}

  ngOnInit() {
    WebChannel.postObject('setAppbarTitle', 'Autenticazione');
    WebChannel.postString('removePageTitle');
  }

  hide = true;
  error = false;
  loginForm = this.loginService.loginForm;

  onSubmit() {
    this.loginService.sendLoginRequest(
      (response) => {
        this.router.navigate(['otp'], {
          relativeTo: this.route,
          queryParamsHandling: 'merge',
        });
      },
      () => {
        this.error = true;
      }
    );
  }

  onPasswordFocus() {
    window.scrollTo(0, window.document.body.scrollHeight - 80);
  }

  focusNext() {
    document.getElementById('password')?.focus();
  }
}
