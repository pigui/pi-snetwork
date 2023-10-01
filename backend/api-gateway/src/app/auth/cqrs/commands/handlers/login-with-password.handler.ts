import { CommandHandler, ICommandHandler } from '@backend/cqrs';
import { LoginWithPasswordCommand } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AccessToken } from '../../../dto';

@CommandHandler(LoginWithPasswordCommand)
export class LoginWithPasswordHandler
  implements ICommandHandler<LoginWithPasswordCommand>
{
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.LOGIN_WITH_PASSWORD);
  }
  async execute({ payload }: LoginWithPasswordCommand): Promise<AccessToken> {
    try {
      const user = await lastValueFrom(
        this.client.send<AccessToken, string>(
          AuthMS.LOGIN_WITH_PASSWORD,
          JSON.stringify(payload)
        )
      );
      return user;
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
