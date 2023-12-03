import { Query } from '@backend/cqrs';

export class GetUserByIdQuery extends Query<string> {
  constructor(public readonly payload: string) {
    super();
  }
}
