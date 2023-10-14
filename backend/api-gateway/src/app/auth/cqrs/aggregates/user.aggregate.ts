import { AggregateRoot } from '@nestjs/cqrs';
import { User } from '../../dto';
import { UserCreatedEvent } from '../events/impl';

export class UserAggregate extends AggregateRoot {
  constructor(private readonly user: User) {
    super();
  }

  userCreated(): void {
    this.apply(new UserCreatedEvent(this.user));
  }
}
