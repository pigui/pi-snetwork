import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@backend/cqrs';
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  GetUsersQuery,
} from './cqrs/query/impl';
import { User } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  findUsers(): Promise<User[]> {
    return this.queryBus.execute<User[]>(new GetUsersQuery());
  }

  findUserById(_id: string): Promise<User> {
    return this.queryBus.execute<User>(new GetUserByIdQuery(_id));
  }

  findUserByEmail(email: string): Promise<User> {
    return this.queryBus.execute<User>(new GetUserByEmailQuery(email));
  }
}
