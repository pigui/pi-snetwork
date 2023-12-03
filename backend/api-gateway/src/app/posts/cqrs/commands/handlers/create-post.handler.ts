import { CommandHandler, ICommandHandler } from '@backend/cqrs';
import { CreatePostCommand } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { PostsMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { EventPublisher } from '@nestjs/cqrs';
import { lastValueFrom } from 'rxjs';
import { Post } from '../../../dto';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(PostsMS.SERVICE_NAME) private readonly client: ClientKafka,
    private readonly publisher: EventPublisher
  ) {
    this.client.subscribeToResponseOf(PostsMS.CREATE_POST_MESSAGE);
  }
  async execute({ payload }: CreatePostCommand): Promise<Post> {
    try {
      const post: Post = await lastValueFrom(
        this.client.send<Post, string>(
          PostsMS.CREATE_POST_MESSAGE,
          JSON.stringify(payload)
        )
      );
      return post;
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
