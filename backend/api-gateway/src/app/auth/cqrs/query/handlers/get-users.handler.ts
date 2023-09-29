import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  async execute(query: GetUsersQuery): Promise<any> {
    return [];
  }
}
