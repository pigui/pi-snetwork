import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { CqrsModule } from '@backend/cqrs';
import { QUERY_HANDLERS } from './cqrs/query/handlers';
import { COMMAND_HANDLERS } from './cqrs/commands/handlers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMS } from '@backend/microservices';
import { v4 as uuidv4 } from 'uuid';
import { EVENT_HANDLERS } from './cqrs/events/handlers';
import { PubSub } from 'graphql-subscriptions';
import { SAGAS } from './cqrs/sagas';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: AuthMS.SERVICE_NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth_' + uuidv4(),
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    ...QUERY_HANDLERS,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...SAGAS,
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
})
export class AuthModule {}
