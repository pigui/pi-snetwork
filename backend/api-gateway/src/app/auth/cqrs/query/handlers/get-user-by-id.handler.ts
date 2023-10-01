import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUserByIdQuery } from '../impl';
import { Inject } from '@nestjs/common';
import { AuthMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.FIND_ONE_BY_ID_MESSAGE);
  }
  async execute({ payload }: GetUserByIdQuery): Promise<any> {
    try {
      return await this.client.send(AuthMS.FIND_ONE_BY_ID_MESSAGE, payload);
    } catch (e) {
      e;
    }
  }
}
