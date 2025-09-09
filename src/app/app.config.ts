import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';

import { provideTranslateService, TranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
  ]
};
