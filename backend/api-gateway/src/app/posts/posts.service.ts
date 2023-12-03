import { CommandBus, QueryBus } from '@backend/cqrs';
import { Injectable } from '@nestjs/common';
import { CreatePostInput, Post } from './dto';
import { PayloadWithUserId } from '../common';
import { CreatePostCommand } from './cqrs/commands/impl';

@Injectable()
export class PostsService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  createPost(createPostInput: CreatePostInput, userId: string) {
    const payload: PayloadWithUserId<CreatePostInput> =
      new PayloadWithUserId<CreatePostInput>(createPostInput, userId);
    return this.commandBus.execute<Post>(new CreatePostCommand(payload));
  }
}
