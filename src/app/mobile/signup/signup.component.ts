import { Component } from '@angular/core';
import { SignupButtonsComponent } from '../components/signup-buttons/signup-buttons.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SignupButtonsComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}
