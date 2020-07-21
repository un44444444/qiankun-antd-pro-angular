import { enableProdMode, NgZone, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { preloaderFinished } from '@delon/theme';
preloaderFinished();

import { hmrBootstrap } from './hmr';

import { getSingleSpaExtraProviders, singleSpaAngular } from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  const bootstrap = async () => {
    const res = await platformBrowserDynamic().bootstrapModule(AppModule, {
      defaultEncapsulation: ViewEncapsulation.Emulated,
    });
    if ((window as any).appBootstrap) {
      (window as any).appBootstrap();
    }
    return res;
  };

  if (environment.hmr) {
    // tslint:disable-next-line: no-string-literal
    if (module['hot']) {
      hmrBootstrap(module, bootstrap);
    } else {
      console.error('HMR is not enabled for webpack-dev-server!');
      console.log('Are you using the --hmr flag for ng serve?');
    }
  } else {
    bootstrap();
  }
}

const { bootstrap, mount, unmount } = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NgZone,
});

export { bootstrap, mount, unmount };
