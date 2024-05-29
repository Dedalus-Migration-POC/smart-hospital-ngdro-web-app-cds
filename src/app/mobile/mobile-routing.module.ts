import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';
import { SignupComponent } from './signup/signup.component';
import { SignupSuccessComponent } from './signup/signup-success/signup-success.component';

export const routes: Routes = [
  {
    path: '',
    component: MobileLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'login/otp',
        component: OtpComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'signup/success',
        component: SignupSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileRoutingModule {}
