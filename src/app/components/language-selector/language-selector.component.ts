import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageLabel } from './languages';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent {
  LanguageLabel = LanguageLabel;

  currentLangLabel: string;

  constructor(public translate: TranslateService) {
    this.currentLangLabel = this.getLangLabel(this.translate.currentLang);
  }

  changeLanguage(lang: string) {
    this.currentLangLabel = this.getLangLabel(lang);
    this.translate.use(lang);
  }

  private getLangLabel(lang: string): LanguageLabel {
    return LanguageLabel[lang as keyof typeof LanguageLabel];
  }
}
