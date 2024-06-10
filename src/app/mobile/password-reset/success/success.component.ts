import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class PasswordResetSuccessComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onExit() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
