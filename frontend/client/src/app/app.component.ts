import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { WebSocketLink } from '@apollo/client/link/ws';
import { InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'client';
  constructor(httpLink: HttpLink, apollo: Apollo) {
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
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http
    );
    apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
