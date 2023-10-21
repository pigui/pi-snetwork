import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthMS } from '@backend/microservices';
import { CreateUserDto } from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(AuthMS.FIND_MESSAGE)
  find() {
    return this.usersService.find();
  }

  @MessagePattern(AuthMS.FIND_ONE_BY_EMAIL_MESSAGE)
  findOneByEmail(@Payload() email: string) {
    this.usersService.findOnebyEmail(email);
  }

  @MessagePattern(AuthMS.FIND_ONE_BY_ID_MESSAGE)
  async findOneById(@Payload() _id: string) {
    this.usersService.findOneById(_id);
  }

  @MessagePattern(AuthMS.CREATE_MESSAGE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
