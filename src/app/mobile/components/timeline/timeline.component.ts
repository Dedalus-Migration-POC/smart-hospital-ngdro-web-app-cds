import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login-mobile-timeline',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: `./timeline.component.html`,
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent {
  @Input({ required: true, alias: 'step' }) step!: number;
  @Input({ required: true, alias: 'steps' }) steps!: Array<number>;
  @Input({ required: true, alias: 'stepsCompleted' })
  stepsCompleted!: Array<number>;
  @Input({ required: true, alias: 'onPrevStep' }) onPrevStep!: VoidFunction;
}
