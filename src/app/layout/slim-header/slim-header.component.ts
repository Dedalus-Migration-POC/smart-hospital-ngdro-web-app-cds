import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Langs } from '../../models/languages';

@Component({
  selector: 'app-slim-header',
  templateUrl: './slim-header.component.html'
})
export class SlimHeaderComponent {
  Langs = Langs;

  currentLangLabel: string;

  constructor(public translate: TranslateService) {
    this.currentLangLabel = this.getLangLabel(this.translate.currentLang);
  }

  changeLanguage(lang: string) {
    this.currentLangLabel = this.getLangLabel(lang);
    this.translate.use(lang);
  }

  private getLangLabel(lang: string): Langs {
    return Langs[lang as keyof typeof Langs];
  }
}
