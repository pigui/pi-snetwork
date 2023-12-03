import { IQueryHandler, QueryHandler } from '@backend/cqrs';
import { GetPostsQuery } from '../impl';
import { HttpException, Inject } from '@nestjs/common';
import { PostsMS } from '@backend/microservices';
import { ClientKafka } from '@nestjs/microservices';
import { Post } from '../../../dto';
import { lastValueFrom } from 'rxjs';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @Inject(PostsMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(PostsMS.FIND_MESSAGE);
  }
  async execute(): Promise<Post[]> {
    try {
      const posts = await lastValueFrom<Post[]>(
        this.client.send(PostsMS.FIND_MESSAGE, '')
      );

      return posts;
    } catch (e) {
      throw new HttpException(e, e?.status || 500);
    }
  }
}
