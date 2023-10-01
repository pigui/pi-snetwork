import { Event } from '@backend/cqrs';
import { User } from '../../../dto';

export class UserCreatedEvent extends Event<User> {
  constructor(public payload: User) {
    super();
  }
}
