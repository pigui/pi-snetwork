import { Injectable } from '@nestjs/common';
import { User } from '../../../application/entities/user';
import { UserEntity } from '../entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserMapper {
  toDomain(entity: UserEntity): User {
    return new User(
      entity._id.toString(),
      entity.email,
      entity.firstName,
      entity.lastName,
      entity.createdAt,
      entity.updatedAt
    );
  }

  toPersistence(domain: User): UserEntity {
    const entity = new UserEntity();
    entity._id = new ObjectId(domain.id);
    entity.email = domain.email;
    entity.firstName = domain.firstName;
    entity.lastName = domain.firstName;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
