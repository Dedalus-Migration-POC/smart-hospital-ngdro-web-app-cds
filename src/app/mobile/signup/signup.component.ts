import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SignupButtonsComponent } from '../components/signup-buttons/signup-buttons.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebChannel } from '../web-channel';
import { DEPLOY_URL } from '../../../main';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressAutocompleteService } from '../../services/address-autocomplete.service';
import { SignUpService } from '../../services/sign-up.service';
import { Nation } from '../../../types/nations';
import { tap } from 'rxjs';
import { City } from '../../../types/cities';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { TranslateModule } from '@ngx-translate/core';
import { MobileButtonComponent } from '../components/mobile-button/mobile-button.component';
import { DirectivesModule } from '../../directives.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    TimelineComponent,
    SignupButtonsComponent,
    CommonModule,
    PipesModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MobileButtonComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  constructor(
    @Inject(DEPLOY_URL) public deployUrl: string,
    public autocompleteService: AddressAutocompleteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public signUpService: SignUpService
  ) {}

  ngOnInit(): void {
    WebChannel.postObject('setAppbarTitle', 'Registrazione');
    WebChannel.postObject(
      'setPageTitle',
      'Compila il form con i dati richiesti'
    );
    WebChannel.postString('switchedToSignup');
  }

  showCities = false;
  showZipCodes = false;
  showNations = false;
  showCitizenship = false;

  signUpForm = this.signUpService.signUpForm;
  onPrevStep = () => {
    this.signUpService.onPrevStep();
  };
  hidePassword1 = this.signUpService.hidePassword1;
  hidePassword2 = this.signUpService.hidePassword2;

  registering = false;
  registrationError = false;

  confirmButtonLabel =
    this.signUpService.step ===
    this.signUpService.steps[this.signUpService.steps.length]
      ? this.registrationError
        ? 'retry'
        : 'confirm'
      : 'continue';

  isRequired(control: keyof typeof this.signUpForm.controls) {
    if (control === 'identity') {
      return (
        this.signUpForm.controls.identity.controls[control].touched &&
        this.signUpForm.controls.identity.controls[control].hasError('required')
      );
    }
    return (
      this.signUpForm.controls[control].touched &&
      this.signUpForm.controls[control].hasError('required')
    );
  }

  isResidenceRequired(
    control: keyof typeof this.signUpForm.controls.residence.controls
  ) {
    return (
      this.signUpForm.controls.residence.controls[control].touched &&
      this.signUpForm.controls.residence.controls[control].hasError('required')
    );
  }

  filterCities(event: Event) {
    this.signUpForm.controls.residence.patchValue({ zipCode: '' });
    const searchString = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();
    this.autocompleteService.filterCities(searchString);
  }

  onCityFieldBlur(event: Event) {
    const firstInputChar = (event.target as HTMLInputElement).value
      .toLowerCase()
      .charAt(0);
    const found =
      this.autocompleteService.cities![firstInputChar] &&
      this.autocompleteService.cities![firstInputChar]!.find(
        (c) =>
          c.label.toLowerCase() ===
          this.signUpForm.controls.residence.value.municipalityName?.toLowerCase()
      );
    WebChannel.postObject(
      'consoleLog',
      'Selected city on blur: ' + found?.label
    );
    if (found) {
      this.onCitySelection(found);
    } else {
      this.signUpForm.controls.residence.patchValue({ municipalityName: '' });
    }
    this.showCities = false;
  }

  onCitySelection(city: City) {
    this.signUpForm.controls.residence.patchValue({
      municipalityName: city.label,
    });
    this.autocompleteService.onCitySelection(city, (zipCodes) => {
      if (zipCodes.length > 1) {
        document.getElementById('userProfileForm.zipCode')?.focus();
        this.showZipCodes = true;
      } else {
        this.signUpForm.controls.residence.patchValue({
          zipCode: zipCodes.at(0),
        });
      }
    });
  }

  onZipSelection(zip: string) {
    this.signUpForm.controls.residence.patchValue({ zipCode: zip });
    this.showZipCodes = false;
  }

  onZipFieldBlur() {
    this.autocompleteService.zipCodes$.pipe(
      tap((zipCodes) => {
        const found = zipCodes.find(
          (c) =>
            c ===
            this.signUpForm.controls.residence.value.zipCode?.toLowerCase()
        );
        if (found) {
          this.onZipSelection(found);
        }
      })
    );
  }

  filterNations(event: Event, formControlName: 'nationality' | 'citizenship') {
    const searchString = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();
    this.signUpForm.patchValue({ [formControlName]: searchString });
    this.autocompleteService.filterNations(searchString);
  }

  onNationSelection(
    nation: Nation,
    formControlName: 'nationality' | 'citizenship'
  ) {
    this.signUpForm.patchValue({ [formControlName]: nation.label });
  }

  onNationFieldBlur(
    event: Event,
    formControlName: 'nationality' | 'citizenship'
  ) {
    const firstInputChar = (event.target as HTMLInputElement).value
      .toLowerCase()
      .charAt(0);
    const found =
      this.autocompleteService.nations![firstInputChar] &&
      this.autocompleteService.nations![firstInputChar]!.find(
        (c) =>
          c.label.toLowerCase() ===
          this.signUpForm.value[formControlName]?.toLowerCase()
      );
    WebChannel.postObject(
      'consoleLog',
      'Selected nation on blur: ' + found?.label
    );
    if (found) {
      this.onNationSelection(found, formControlName);
    } else {
      this.signUpForm.patchValue({ [formControlName]: '' });
    }
  }

  canContinue() {
    let result = true;
    let controls: Array<keyof typeof this.signUpForm.controls> =
      this.signUpService.step === 0
        ? ['firstName', 'lastName', 'email', 'phoneNumber', 'identity']
        : this.signUpService.step === 1
        ? ['residence']
        : ['password', 'password2'];

    controls.forEach((control) => {
      if (!this.signUpForm.controls[control].valid) result = false;
    });
    return result;
  }

  sendRequest() {
    this.registering = true;
    this.registrationError = false;
    WebChannel.postString('closeKeyboard');
    this.signUpService.sendRequest(
      () => {
        this.registering = false;
        WebChannel.postString('signUpSuccess');
        this.router.navigate(['../success'], {
          queryParamsHandling: 'merge',
          relativeTo: this.activatedRoute,
        });
      },
      () => {
        this.registrationError = true;
        this.registering = false;
      }
    );
  }

  onSubmit() {
    this.signUpService.stepsCompleted.push(this.signUpService.step);
    window.scrollTo({ top: 0 });
    if (
      this.signUpService.step ===
      this.signUpService.steps[this.signUpService.steps.length - 1]
    ) {
      this.signUpService.stepsCompleted.pop();
      this.sendRequest();
    } else {
      this.signUpService.step = this.signUpService.step + 1;
    }
  }

  onCancel() {
    if (WebChannel.isPresent) {
      WebChannel.postString('closeLoginWebView');
    }
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
