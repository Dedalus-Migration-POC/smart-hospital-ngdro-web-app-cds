import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-mobile-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <button
    [type]="type"
    [disabled]="loading || disabled"
    [ngClass]="outlined ? 'outlined' : undefined"
    [ngStyle]="{ opacity: disabled ? 0.5 : undefined }"
    type="submit"
  >
    <ng-content></ng-content>
    <fa-icon
      *ngIf="loading"
      animation="spin"
      [icon]="['fas', 'spinner']"
    ></fa-icon>
  </button>`,
  styles: [
    `
      button {
        border-radius: 20px;
        min-height: 50px;
        padding: 5px 30px;
        background-color: #22c6b1;
        border: none;
        width: 100%;
        color: #262626;
        font-family: Titillium Web;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
      }
      .outlined {
        background-color: #fff;
        border: 1px solid #22c6b1;
      }

      fa-icon {
        margin-left: 10px;
        font-size: 20px;
      }
    `,
  ],
})
export class MobileButtonComponent {
  @Input() type?: HTMLButtonElement['type'];
  @Input() loading?: boolean;
  @Input() disabled?: boolean;
  @Input() outlined?: boolean;
}
