import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUserByIdQuery } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { User } from '../../../dto';
import { lastValueFrom } from 'rxjs';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.FIND_ONE_BY_ID_MESSAGE);
  }
  async execute({ payload }: GetUserByIdQuery): Promise<User> {
    try {
      return await lastValueFrom(
        this.client.send<User, string>(AuthMS.FIND_ONE_BY_ID_MESSAGE, payload)
      );
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
