import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUsersQuery } from '../impl';
import { ClientKafka } from '@nestjs/microservices';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from '../../../dto';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.CREATE_MESSAGE);
  }
  async execute(): Promise<User[]> {
    try {
      return lastValueFrom(this.client.send(AuthMS.CREATE_MESSAGE, ''));
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
