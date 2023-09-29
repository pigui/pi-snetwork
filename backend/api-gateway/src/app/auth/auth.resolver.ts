import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query()
  findUsers(): Promise<User[]> {
    return this.authService.findUsers();
  }
}
