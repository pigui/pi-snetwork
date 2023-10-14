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
import { provideHttpClient } from '@angular/common/http';

import { ApolloModule } from 'apollo-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects, AuthFacade, authFeature } from '@frontend/services';
import { ApolloAngularSDK } from '@frontend/graphql';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(ApolloModule),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreDevtoolsModule.instrument({
        logOnly: !isDevMode(),
      }),
      StoreModule.forFeature(authFeature),
      EffectsModule.forFeature(AuthEffects)
    ),
    ApolloAngularSDK,
    AuthFacade,
  ],
};
