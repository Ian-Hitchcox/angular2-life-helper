import { Injectable } from '@angular/core';
import { CookieService } from './cookie-service';


@Injectable()
export class ConfigService {
  
  static GetConfig() {
      return CookieService.GetCookie('life-helper-config');
  }

  static SetConfig(config: any) {
      return CookieService.SetCookie('life-helper-config', config, 9990000);
  }
}