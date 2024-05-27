import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { InjectionToken, enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const DEPLOY_URL = new InjectionToken<string>('deployUrl');
export const deployUrl = (function () {
  const scripts = document.getElementsByTagName('script');
  const index = scripts.length - 1;
  const mainScript = scripts[index];
  return mainScript.src.replace(/main.*?\.js$/, '');
})();

const providers = [
  {
    provide: DEPLOY_URL,
    useValue: deployUrl,
  },
];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
