import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { SlimHeaderComponent } from './slim-header/slim-header.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    SlimHeaderComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent
  ],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [
    SlimHeaderComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent
  ]
})
export class LayoutModule {}
