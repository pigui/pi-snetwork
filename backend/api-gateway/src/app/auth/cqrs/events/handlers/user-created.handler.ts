import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl';
import { PubSub } from 'graphql-subscriptions';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly pubSub: PubSub) {}
  handle({ payload }: UserCreatedEvent) {
    this.pubSub.publish('userCreated', { userCreated: payload });
  }
}
