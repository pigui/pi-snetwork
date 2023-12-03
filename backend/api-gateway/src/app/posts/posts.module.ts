import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERY_HANDLERS } from './cqrs/queries/handlers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsMS } from '@backend/microservices';
import { v4 as uuidv4 } from 'uuid';
import { COMMAND_HANDLERS } from './cqrs/commands/handlers';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: PostsMS.SERVICE_NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'posts_' + uuidv4(),
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'posts',
          },
        },
      },
    ]),
  ],
  providers: [
    PostsResolver,
    PostsService,
    ...QUERY_HANDLERS,
    ...COMMAND_HANDLERS,
  ],
})
export class PostsModule {}
