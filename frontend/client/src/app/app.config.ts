import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(ApolloModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({
          uri: 'http://localhost:3000/graphql',
        });

        const ws = new WebSocketLink({
          uri: 'ws://localhost:3000/graphql',
          options: {
            reconnect: true,
          },
        });
        const link = split(
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query) as any;
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          ws,
          http
        );

        return {
          link,
          // ... options
        };
      },
      deps: [HttpLink],
    },
  ],
};
