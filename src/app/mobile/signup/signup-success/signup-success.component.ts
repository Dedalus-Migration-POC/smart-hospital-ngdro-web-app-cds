import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DEPLOY_URL } from '../../../../main';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes.module';
import { MobileButtonComponent } from '../../components/mobile-button/mobile-button.component';

@Component({
  selector: 'app-sign-up-success',
  standalone: true,
  imports: [TranslateModule, PipesModule, MobileButtonComponent],
  styleUrl: './signup-success.component.scss',
  templateUrl: './signup-success.component.html',
})
export class SignupSuccessComponent implements OnInit {
  constructor(
    @Inject(DEPLOY_URL) public deployUrl: string,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onContinue() {
    this.router.navigate(['..'], {
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
