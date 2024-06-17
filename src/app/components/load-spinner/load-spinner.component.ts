import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrl: './load-spinner.component.scss'
})
export class LoadSpinnerComponent {
  @Input() showLabel!: boolean;
  @Input() appendToBody: boolean = false;
  @Input() styleClass?: string;
}
