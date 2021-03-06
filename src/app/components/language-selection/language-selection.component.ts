import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../services/translate.service';
import { LANGUAGES, FLAGS_BY_LANG } from '../../Constants';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})

export class LanguageSelectionComponent implements OnInit {

  languages = LANGUAGES;
  flagsByLanguage = FLAGS_BY_LANG;

  selectedLanguage = 'fr';
  showFlags = false;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.selectedLanguage = this.translate.selectedLanguage;
  }

  setLang(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang;
  }

  displayFlags(newState: boolean) {
    this.showFlags = newState;
  }
}
