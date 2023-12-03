import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostsMS } from '@backend/microservices';
import { CreatePostDto } from './dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @MessagePattern(PostsMS.CREATE_POST_MESSAGE)
  create(@Payload() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @MessagePattern(PostsMS.FIND_ONE_BY_ID_MESSAGE)
  async findOneById(@Payload() _id: string) {
    this.postsService.findOneById(_id);
  }

  @MessagePattern(PostsMS.FIND_MESSAGE)
  async find() {
    return this.postsService.find();
  }
}
