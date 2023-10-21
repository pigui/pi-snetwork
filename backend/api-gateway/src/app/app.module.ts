import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CqrsModule } from '@backend/cqrs';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@backend/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'libs/backend/graphql/src/lib/graphql.ts'),
        outputAs: 'interface',
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          ...error,
        };
        return graphQLFormattedError;
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
