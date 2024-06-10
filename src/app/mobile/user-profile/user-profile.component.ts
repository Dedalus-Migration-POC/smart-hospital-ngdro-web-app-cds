import { Component, Inject, OnInit } from '@angular/core';
import { ProfileManagerService } from '../../services/profile-manager.service';
import { AddressAutocompleteService } from '../../services/address-autocomplete.service';
import { Router } from '@angular/router';
import { PatientAddressData, UserProfile } from './user-profile';
import { WebChannel } from '../web-channel';
import { EMPTY, catchError, finalize, map, tap } from 'rxjs';
import { City } from '../../../types/cities';
import { Nation } from '../../../types/nations';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidationUtils } from '../../utils/form-validation-utils';
import { CommonModule } from '@angular/common';
import { MobileButtonComponent } from '../components/mobile-button/mobile-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes.module';
import { DirectivesModule } from '../../directives.module';
import { ImageComponent } from '../../components/image/image.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MobileButtonComponent,
    TranslateModule,
    PipesModule,
    DirectivesModule,
    ImageComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  constructor(
    private profileManagerService: ProfileManagerService,
    public autocompleteService: AddressAutocompleteService,
    private router: Router
  ) {}

  showCities = false;
  showZipCodes = false;
  showNations = false;
  showCitizenship = false;

  error = false;
  patient?: UserProfile;

  ngOnInit(): void {
    WebChannel.postString('fetchingProfile');
    this.error = false;
    this.profileManagerService
      .getProfile()
      .pipe(
        map((patient) => {
          this.patient = patient;
          WebChannel.postObject('consoleLog', JSON.stringify(patient));
          this.userProfileForm.patchValue({
            ...patient,
            taxCode: patient.identity.identity,
            street: patient.residence?.street,
            number: patient.residence?.number,
            municipalityName: patient.residence?.municipalityName,
            zipCode: patient.residence?.zipCode,
          });
          WebChannel.postString('fetchedProfile');
        }),
        catchError((error) => {
          WebChannel.postString('fetchProfileError');
          WebChannel.postObject('consoleLog', JSON.stringify(error));
          this.error = true;
          return EMPTY;
        })
      )
      .subscribe();
  }

  filterCities(event: Event) {
    const searchString = (event.target as HTMLInputElement).value
      .toLowerCase()
      .trim();
    this.userProfileForm.patchValue({ zipCode: '' });
    this.autocompleteService.filterCities(searchString);
  }

  onCitySelection(city: City) {
    this.userProfileForm.patchValue({ municipalityName: city.label });
    this.autocompleteService.onCitySelection(city, (zipCodes) => {
      if (zipCodes.length > 1) {
        document.getElementById('userProfileForm.zipCode')?.focus();
        this.showZipCodes = true;
      } else {
        this.userProfileForm.patchValue({
          zipCode: zipCodes.at(0),
        });
      }
    });
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
          this.userProfileForm.value.municipalityName?.toLowerCase()
      );
    WebChannel.postObject(
      'consoleLog',
      'Selected city on blur: ' + found?.label
    );
    if (found) {
      this.onCitySelection(found);
    } else {
      this.userProfileForm.patchValue({ municipalityName: '' });
    }
    this.showCities = false;
  }

  onZipSelection(zip: string) {
    this.userProfileForm.patchValue({ zipCode: zip });
    this.showZipCodes = false;
  }

  onZipFieldBlur(event: Event) {
    this.autocompleteService.zipCodes$.pipe(
      tap((zipCodes) => {
        const found = zipCodes.find(
          (c) => c === this.userProfileForm.value.zipCode?.toLowerCase()
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
    this.userProfileForm.patchValue({ [formControlName]: searchString });
    this.autocompleteService.filterNations(searchString);
  }

  onNationSelection(
    nation: Nation,
    formControlName: 'nationality' | 'citizenship'
  ) {
    this.userProfileForm.patchValue({ [formControlName]: nation.label });
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
          this.userProfileForm.value[formControlName]?.toLowerCase()
      );
    WebChannel.postObject(
      'consoleLog',
      'Selected nation on blur: ' + found?.label
    );
    if (found) {
      this.onNationSelection(found, formControlName);
    } else {
      this.userProfileForm.patchValue({ [formControlName]: '' });
    }
  }

  userProfileForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    taxCode: FormControl<string | null>;
    email: FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    municipalityName: FormControl<string | null>;
    zipCode: FormControl<string | null>;
    street: FormControl<string | null>;
    number: FormControl<string | null>;
    nationality: FormControl<string | null>;
    citizenship: FormControl<string | null>;
    sequence: FormControl<string | null>;
  }> = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    taxCode: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      FormValidationUtils.italianPhoneValidator,
      FormValidationUtils.phoneValidator,
    ]),
    municipalityName: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    nationality: new FormControl(null as string | null, [Validators.required]),
    citizenship: new FormControl(null as string | null, [Validators.required]),
    sequence: new FormControl(''),
  });

  hidePassword = true;
  updating = false;
  updateError = null;

  onSubmit() {
    this.updating = true;
    this.updateError = null;
    WebChannel.postString('closeKeyboard');
    this.userProfileForm.markAllAsTouched();
    if (this.userProfileForm.valid) {
      const data = {
        ...this.patient,
        ...this.userProfileForm.value,
      } as UserProfile;
      WebChannel.postObject('consoleLog', JSON.stringify(data));
      this.profileManagerService
        .updateProfile({
          ...data,
          identity: {
            ...data.identity,
            identity: this.userProfileForm!.value!.taxCode!,
          },
          residence: {
            ...data.residence,
            street: this.userProfileForm.value.street,
            number: this.userProfileForm.value.number,
            municipalityName: this.userProfileForm.value.municipalityName,
            zipCode: this.userProfileForm.value.zipCode,
          } as PatientAddressData,
          domicile: {
            ...data.domicile,
            street: this.userProfileForm.value.street,
            number: this.userProfileForm.value.number,
            municipalityName: this.userProfileForm.value.municipalityName,
            zipCode: this.userProfileForm.value.zipCode,
          } as PatientAddressData,
        })
        .pipe(
          catchError((err) => {
            this.updateError = err;
            WebChannel.postObject('consoleLog', JSON.stringify(err));
            return EMPTY;
          }),
          finalize(() => (this.updating = false))
        )
        .subscribe((res) => {
          WebChannel.postObject('consoleLog', JSON.stringify(res));
          WebChannel.postString('profileEditSuccess');
        });
    }
  }

  onCancel() {
    WebChannel.postString('closeLoginWebView');
    if (!WebChannel.isPresent) {
      this.router.navigate(['/']);
    }
  }
}
