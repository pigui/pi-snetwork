import { Query } from '@backend/cqrs';

export class GetUserByEmailQuery extends Query<string> {
  constructor(public readonly payload: string) {
    super();
  }
}
