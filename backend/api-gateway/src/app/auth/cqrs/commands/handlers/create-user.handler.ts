import { CommandHandler, ICommandHandler } from '@backend/cqrs';
import { CreateUserCommand } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { User } from '../../../dto';
import { lastValueFrom } from 'rxjs';
import { EventPublisher } from '@nestjs/cqrs';
import { UserAggregate } from '../../aggregates';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka,
    private readonly publisher: EventPublisher
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

      const UserModel: typeof UserAggregate =
        this.publisher.mergeClassContext(UserAggregate);
      const userAggregate: UserAggregate = new UserModel(user);
      userAggregate.userCreated();
      userAggregate.commit();
      return user;
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
