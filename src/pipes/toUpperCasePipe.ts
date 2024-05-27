import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toUpperCase'})
export class ToUpperCasePipe implements PipeTransform {
  constructor() {
  }

  transform(text: string) {
    return text.toUpperCase();
  }
}
