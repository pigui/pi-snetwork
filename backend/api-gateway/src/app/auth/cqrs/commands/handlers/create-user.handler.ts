import { CommandHandler, EventBus, ICommandHandler } from '@backend/cqrs';
import { CreateUserCommand } from '../impl';
import { Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { User } from '../../../dto';
import { lastValueFrom } from 'rxjs';
import { UserCreatedEvent } from '../../events/impl';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka,
    private readonly eventBus: EventBus
  ) {
    this.client.subscribeToResponseOf(AuthMS.CREATE_MESSAGE);
  }
  async execute({ payload }: CreateUserCommand): Promise<User> {
    try {
      const user = await lastValueFrom(
        this.client.send<User, string>(
          AuthMS.CREATE_MESSAGE,
          JSON.stringify(payload)
        )
      );

      this.eventBus.publish(new UserCreatedEvent(user));
      return user;
    } catch (e) {
      e;
    }
  }
}
