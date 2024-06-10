import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'passwordChar',
})
export class PasswordCharPipe implements PipeTransform {
  transform(control: FormControl<string | null>, replaceChar?: string): any {
    if (control.value === undefined || control.value === null) {
      return control.value;
    }
    // Replace with the specified character
    if (replaceChar) {
      return replaceChar.repeat(control.value.length);
    }
    // Replace value with asterisks
    return '*'.repeat(control.value.length);
  }
}
