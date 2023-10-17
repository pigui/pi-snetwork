import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@backend/cqrs';
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  GetUsersQuery,
} from './cqrs/query/impl';
import {
  AccessToken,
  CreateUserInput,
  LoginWithPasswordInput,
  RefreshTokensInput,
  User,
} from './dto';
import {
  CreateUserCommand,
  LoginWithPasswordCommand,
  RefreshTokensCommand,
} from './cqrs/commands/impl';

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

  createUser(createUserInput: CreateUserInput): Promise<User> {
    return this.commandBus.execute<User>(
      new CreateUserCommand(createUserInput)
    );
  }

  loginWithPassword(
    loginWithPasswordInput: LoginWithPasswordInput
  ): Promise<AccessToken> {
    return this.commandBus.execute(
      new LoginWithPasswordCommand(loginWithPasswordInput)
    );
  }

  refreshTokens(refreshTokensInput: RefreshTokensInput): Promise<AccessToken> {
    return this.commandBus.execute(
      new RefreshTokensCommand(refreshTokensInput)
    );
  }
}
