import { CommandHandler, ICommandHandler } from '@backend/cqrs';
import { RefreshTokensCommand } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AccessToken } from '../../../dto';

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensHandler
  implements ICommandHandler<RefreshTokensCommand>
{
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.REFRESH_TOKENS);
  }
  async execute({ payload }: RefreshTokensCommand): Promise<AccessToken> {
    try {
      const user = await lastValueFrom(
        this.client.send<AccessToken, string>(
          AuthMS.REFRESH_TOKENS,
          JSON.stringify(payload)
        )
      );
      return user;
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
