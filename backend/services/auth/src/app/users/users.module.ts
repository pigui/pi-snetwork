import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@backend/database';
import { UserDocument, UserSchema } from './models';
import { UsersRepository } from './repositories/users.repository';
import { HashingModule } from '@backend/hashing';

@Module({
  imports: [
    HashingModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
