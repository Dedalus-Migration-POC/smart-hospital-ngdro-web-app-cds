import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const fiscalCodeRegex =
  /^(?:[B-DF-HJ-NP-TV-Z](?:[AEIOU]{2}|[AEIOU]X)|[AEIOU]{2}X|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[\dLMNP-V][1-9MNP-V]|[1-9MNP-V][0L]))[A-Z]$/i;

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

const mobilePhoneRegex =
  /^(\((00|\+)39\)|(00|\+)39)?(32[47890]|33[134567890]|34[24567890]|35[0-9]|36[680]|37[367890]|38[1890]|39[123])\d{7}$/;

export const FormValidationUtils = {
  fiscalCodeValidator: (control: AbstractControl): ValidationErrors | null =>
    fiscalCodeRegex.test(control?.value) ? null : { invalidFiscalCode: true },

  emailValidator: (control: AbstractControl): ValidationErrors | null =>
    emailRegex.test(control?.value) ? null : { invalidEmail: true },

  italianPhoneValidator: (control: AbstractControl): ValidationErrors | null =>
    control?.value &&
    ((control.value.startsWith('+') && !control.value.startsWith('+39')) ||
      (control.value.startsWith('00') && !control.value.startsWith('0039')))
      ? { notItalianPhone: true }
      : null,

  accepted: (control: AbstractControl): ValidationErrors | null => {
    return control?.value === true ? null : { notAccepted: true };
  },

  phoneValidator: (control: AbstractControl): ValidationErrors | null =>
    mobilePhoneRegex.test(control?.value) ? null : { invalidPhone: true },

  passwordValidator: (control: AbstractControl): ValidationErrors | null =>
    passwordRegex.test(control?.value) ? null : { invalidPassword: true },

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  },

  minKeysValidator:
    (min: number) =>
    (control: AbstractControl): ValidationErrors | null =>
      Object.values(control.value).length < min
        ? { invalidMinKeys: true }
        : null,
};

export class PasswordValidator {
  static matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { passwordMismatch: true }
        : null;
    };
  }
}
