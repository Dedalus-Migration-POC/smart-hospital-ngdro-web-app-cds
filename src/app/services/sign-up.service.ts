import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationUtils } from '../utils/form-validation-utils';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileManagerService } from './profile-manager.service';
import { environment } from '../../environments/environment';
import { UserProfile } from '../../types/user-profile';

type AddressData = {
  municipalityName: FormControl<string | null>;
  street: FormControl<string | null>;
  number: FormControl<string | null>;
  zipCode: FormControl<string | null>;
};

type IdentityData = {
  identity: FormControl<string | null>;
};

type SignUpForm = FormGroup<{
  firstName: FormControl<string | null | undefined>;
  lastName: FormControl<string | null | undefined>;
  identity: FormGroup<IdentityData>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  residence: FormGroup<AddressData>;
  nationality: FormControl<string | null>;
  citizenship: FormControl<string | null>;
  password: FormControl<string | null>;
  password2: FormControl<string | null>;
}>;

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    private httpClient: HttpClient,
    private profileManagerService: ProfileManagerService
  ) {}

  hidePassword1 = true;
  hidePassword2 = true;

  step = 0;
  steps = [0, 1, 2];
  stepsCompleted: Array<number> = [];
  signUpForm: SignUpForm = new FormGroup(
    {
      firstName: new FormControl('' as string | undefined, [
        Validators.required,
      ]),
      lastName: new FormControl('' as string | undefined, [
        Validators.required,
      ]),
      identity: new FormGroup<IdentityData>({
        identity: new FormControl(
          environment.production ? null : (null as string | null),
          [Validators.required, FormValidationUtils.fiscalCodeValidator]
        ),
      }),
      phoneNumber: new FormControl(
        environment.production ? null : (null as string | null),
        [
          Validators.required,
          FormValidationUtils.italianPhoneValidator,
          FormValidationUtils.phoneValidator,
        ]
      ),
      email: new FormControl(
        environment.production ? null : (null as string | null),
        [Validators.required, FormValidationUtils.emailValidator]
      ),
      residence: new FormGroup({
        number: new FormControl(
          environment.production ? null : (null as string | null),
          [Validators.required]
        ),
        municipalityName: new FormControl(
          environment.production ? null : (null as string | null),
          [Validators.required]
        ),
        zipCode: new FormControl(
          environment.production ? null : (null as string | null),
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
          ]
        ),
        street: new FormControl(
          environment.production ? null : (null as string | null),
          [Validators.required]
        ),
      }),
      nationality: new FormControl(null as string | null, [
        Validators.required,
      ]),
      citizenship: new FormControl(null as string | null, [
        Validators.required,
      ]),
      password: new FormControl(
        environment.production ? null : (null as string | null),
        [Validators.required, FormValidationUtils.passwordValidator]
      ),
      password2: new FormControl(
        environment.production ? null : (null as string | null),
        [Validators.required]
      ),
    },
    { validators: [FormValidationUtils.match('password', 'password2')] }
  );

  onPrevStep() {
    this.step = this.step - 1;
    this.stepsCompleted.pop();
  }

  sendRequest(onSuccess: VoidFunction, onError: VoidFunction) {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.profileManagerService
        .signUp(this.signUpForm.value as UserProfile)
        .pipe(
          catchError(() => {
            onError();
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.signUpForm.reset();
          onSuccess();
        });
    }
  }
}
