import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  CreateUserInput,
  FindUserByIdInput,
  LoginWithPasswordInput,
} from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
}
