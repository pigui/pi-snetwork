import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetUserByEmailQuery } from '../impl';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  execute(query: GetUserByEmailQuery): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
