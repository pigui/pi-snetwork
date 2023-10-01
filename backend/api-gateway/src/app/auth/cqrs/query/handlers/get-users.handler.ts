import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUsersQuery } from '../impl';
import { ClientKafka } from '@nestjs/microservices';
import { HttpException, Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { lastValueFrom } from 'rxjs';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.FIND_MESSAGE);
  }
  async execute(): Promise<any> {
    try {
      return lastValueFrom(this.client.send(AuthMS.FIND_MESSAGE, ''));
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
