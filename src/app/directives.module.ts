import { NgModule } from '@angular/core';
import { UpperCaseInputDirective } from '../directives/upperCaseInputDirective';
import { LowerCaseInputDirective } from '../directives/lowerCaseInputDirective';

@NgModule({
  imports: [],
  declarations: [LowerCaseInputDirective, UpperCaseInputDirective],
  exports: [LowerCaseInputDirective, UpperCaseInputDirective],
})
export class DirectivesModule {}
