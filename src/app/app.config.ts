import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import {
  ServersEffects,
  serversFeature,
} from '@metin2tools/servers/data-access';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(ServersEffects),
    provideStore({
      router: routerReducer,
    }),
    provideState(serversFeature),
    provideRouterStore(),
    provideClientHydration(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
    provideStoreDevtools({ logOnly: !isDevMode() }),
  ],
};
