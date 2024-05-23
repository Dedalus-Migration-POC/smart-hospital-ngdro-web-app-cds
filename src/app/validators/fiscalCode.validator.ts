import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/*
* Fiscal code validator
*
* Starts with 6 letters, then 2 numbers, then 1 letter,
*  then 2 numbers, then 1 letter, 3 numbers and 1 final letter.
*
*	(case sensitive search)
*
* */
export function fiscalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) { return null; }

    const codiceFiscaleRegex = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/i;
    const isValid = codiceFiscaleRegex.test(control.value);
    return isValid ? null : { 'invalidFiscalCode': { value: control.value } };
  };
}
