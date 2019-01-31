import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/IAppConfig';

@Injectable()
export class ConfigService {
  config: IAppConfig;
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
    this.http.get(this.configUrl)
      .subscribe((config: IAppConfig) => {
        this.config = config;
      });
  }

  public load(): IAppConfig {
    return this.config;
  }
}
