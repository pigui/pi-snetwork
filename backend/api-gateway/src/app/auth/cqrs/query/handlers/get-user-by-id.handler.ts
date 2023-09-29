import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUserByIdQuery } from '../impl';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  execute(query: GetUserByIdQuery): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
