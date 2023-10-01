import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UserDocument } from './models';
import { CreateUserDto } from './dto';
import { HashingService } from '@backend/hashing';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService
  ) {}

  async find(): Promise<UserDocument[]> {
    try {
      return await this.usersRepository.find();
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async findOneById(_id: string): Promise<UserDocument> {
    try {
      return await this.usersRepository.findById(_id);
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async findOnebyEmail(email: string): Promise<UserDocument> {
    try {
      return await this.usersRepository.findOne({ email });
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const findUserByEmail: UserDocument = await this.findOnebyEmail(
        createUserDto.email
      );

      if (findUserByEmail) {
        throw new ConflictException();
      }
      return await this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingService.hash(createUserDto.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
