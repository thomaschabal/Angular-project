import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateService {

  phrases: any = {};
  selectedLanguage = 'fr';

  constructor(private http: HttpClient) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `../../assets/i18n/${lang || 'en'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.phrases = Object.assign({}, translation || {});
          this.selectedLanguage = lang;
          resolve(this.phrases);
        },
        error => {
          this.phrases = {};
          this.selectedLanguage = lang;
          resolve(this.phrases);
        }
      );
    });
  }

}
