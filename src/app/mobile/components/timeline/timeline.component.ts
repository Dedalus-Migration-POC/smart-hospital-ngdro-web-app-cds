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
  @Input() step!: number;
  @Input() steps!: Array<number>;
  @Input() stepsCompleted!: Array<number>;
  @Input() onPrevStep!: Function;
}
