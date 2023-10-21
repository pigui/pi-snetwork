import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  CreateUserInput,
  FindUserByIdInput,
  LoginWithPasswordInput,
  RefreshTokensInput,
  User,
} from './dto';
import { PubSub } from 'graphql-subscriptions';
import { ActiveUser, Auth } from './decorators';
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

  @Query()
  currentUser(@ActiveUser() user: User) {
    return user;
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

  @Auth(AuthType.None)
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
