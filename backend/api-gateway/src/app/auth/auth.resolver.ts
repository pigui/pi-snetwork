import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  CreateUserInput,
  FindUserByIdInput,
  LoginWithPasswordInput,
} from './dto';
import { PubSub } from 'graphql-subscriptions';

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
  @Mutation()
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.createUser(createUserInput);
  }

  @Mutation()
  loginWithPassword(
    @Args('loginWithPasswordInput')
    loginWithPasswordInput: LoginWithPasswordInput
  ) {
    return this.authService.loginWithPassword(loginWithPasswordInput);
  }

  @Subscription()
  userCreated() {
    return this.pubSub.asyncIterator('userCreated');
  }
}
