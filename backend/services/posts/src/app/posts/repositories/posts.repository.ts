import { AbstractRepository } from '@backend/database';
import { Injectable } from '@nestjs/common';
import { PostDocument } from '../models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostsRepository extends AbstractRepository<PostDocument> {
  constructor(
    @InjectModel(PostDocument.name)
    private readonly postModel: Model<PostDocument>
  ) {
    super(postModel);
  }
}
