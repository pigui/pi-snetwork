import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { ApolloModule } from 'apollo-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  AuthEffects,
  AuthFacade,
  UiEffects,
  UiFacade,
  authFeature,
  uiFeature,
} from '@frontend/services';
import { ApolloAngularSDK } from '@frontend/graphql';
import { httpInterceptor } from './interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([httpInterceptor])
    ),
    importProvidersFrom(ApolloModule),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreDevtoolsModule.instrument({
        logOnly: !isDevMode(),
      }),
      StoreModule.forFeature(authFeature),
      StoreModule.forFeature(uiFeature),
      EffectsModule.forFeature(AuthEffects, UiEffects)
    ),
    ApolloAngularSDK,
    AuthFacade,
    UiFacade,
  ],
};
