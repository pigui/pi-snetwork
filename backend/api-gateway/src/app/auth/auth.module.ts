import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { CqrsModule } from '@backend/cqrs';
import { QUERY_HANDLERS } from './cqrs/query/handlers';
import { COMMAND_HANDLERS } from './cqrs/commands/handlers';

@Module({
  imports: [CqrsModule],
  providers: [
    AuthResolver,
    AuthService,
    ...QUERY_HANDLERS,
    ...COMMAND_HANDLERS,
  ],
})
export class AuthModule {}
