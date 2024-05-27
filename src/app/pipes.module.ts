import { NgModule } from '@angular/core';
import { ToUpperCasePipe } from '../pipes/toUpperCasePipe';
import { PasswordCharPipe } from '../pipes/passwordCharPipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@NgModule({
  imports: [],
  declarations: [ToUpperCasePipe, PasswordCharPipe, CapitalizePipe],
  exports: [ToUpperCasePipe, PasswordCharPipe, CapitalizePipe],
})
export class PipesModule {}
