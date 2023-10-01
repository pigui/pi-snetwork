import { AbstractRepository } from '@backend/database';
import { UserDocument } from '../models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>
  ) {
    super(userModel);
  }
}
