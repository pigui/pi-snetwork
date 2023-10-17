import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  CreateUserInput,
  FindUserByIdInput,
  LoginWithPasswordInput,
  RefreshTokensInput,
} from './dto';
import { PubSub } from 'graphql-subscriptions';
import { Auth } from './decorators';
import { AuthType } from './enums';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly pubSub: PubSub
  ) {}

  @Query()
  findUsers() {
    return this.authService.findUsers();
  }

  @Query()
  findUserById(@Args('findUserByIdInput') { _id }: FindUserByIdInput) {
    return this.authService.findUserById(_id);
  }

  @Auth(AuthType.None)
  @Mutation()
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createUser(createUserInput);
  }

  @Auth(AuthType.None)
  @Mutation()
  loginWithPassword(
    @Args('loginWithPasswordInput')
    loginWithPasswordInput: LoginWithPasswordInput
  ) {
    return this.authService.loginWithPassword(loginWithPasswordInput);
  }

  @Mutation()
  refreshTokens(
    @Args('refreshTokensInput') refreshTokensInput: RefreshTokensInput
  ) {
    return this.authService.refreshTokens(refreshTokensInput);
  }

  @Subscription()
  userCreated() {
    return this.pubSub.asyncIterator('userCreated');
  }
}
