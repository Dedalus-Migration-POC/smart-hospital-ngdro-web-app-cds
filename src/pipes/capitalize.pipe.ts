import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  private static capitalizeFirst(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  transform(text: string | null, snake?: boolean) {
    if (!text) return null;
    return snake
      ? text.split(' ').map(CapitalizePipe.capitalizeFirst).join(' ')
      : CapitalizePipe.capitalizeFirst(text);
  }
}
