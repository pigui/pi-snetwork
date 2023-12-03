import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUserByEmailQuery } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { User } from '../../../dto';
import { lastValueFrom } from 'rxjs';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.FIND_ONE_BY_EMAIL_MESSAGE);
  }
  async execute({ payload }: GetUserByEmailQuery): Promise<User> {
    try {
      return await lastValueFrom(
        this.client.send<User, string>(
          AuthMS.FIND_ONE_BY_EMAIL_MESSAGE,
          payload
        )
      );
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
