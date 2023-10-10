import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languages: Array<string> = ['en-US', 'pt-BR'];
  selectedLanguage: string = 'pt-BR';
  localStorageLanguageKey = 'language';

  constructor(public translate: TranslateService) {
    translate.addLangs(this.languages);
    this.setDefaultLanguage();
  }

  private setDefaultLanguage(): void {
    const browserLang = this.translate.getBrowserLang();
    const localStorageLang = window.localStorage.getItem(this.localStorageLanguageKey);

    let language: string = 'pt-BR';
    if (localStorageLang) {
      language = localStorageLang;
    } else {
      language = browserLang!;
    }

    this.translate.setDefaultLang(language!);
    this.updateLanguage(language);
  }

  updateLanguage(language: string): void {
    this.selectedLanguage = language;
    window.localStorage.setItem(this.localStorageLanguageKey, language);
    this.translate.use(this.selectedLanguage);
  }
}
