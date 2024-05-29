import { Component, Input } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkWithHref,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes.module';
import { CommonModule } from '@angular/common';
import { MobileButtonComponent } from '../mobile-button/mobile-button.component';

@Component({
  selector: 'app-signup-buttons',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLink,
    TranslateModule,
    PipesModule,
    MobileButtonComponent,
  ],
  templateUrl: './signup-buttons.component.html',
  styleUrl: './signup-buttons.component.scss',
})
export class SignupButtonsComponent {
  signUpMode = false;

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(([{ path }]) => {
      this.signUpMode = path === 'signup';
    });
  }
}
