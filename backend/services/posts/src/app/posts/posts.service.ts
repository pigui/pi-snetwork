import { Injectable } from '@nestjs/common';
import { PostsRepository } from './repositories';
import { PostDocument } from './models';
import { RpcException } from '@nestjs/microservices';
import { CreatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async find(): Promise<PostDocument[]> {
    try {
      return await this.postsRepository.find();
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async findOneById(_id: string): Promise<PostDocument> {
    try {
      return await this.postsRepository.findById(_id);
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async create(createPostDto: CreatePostDto): Promise<PostDocument> {
    try {
      return await this.postsRepository.create({
        ...createPostDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
