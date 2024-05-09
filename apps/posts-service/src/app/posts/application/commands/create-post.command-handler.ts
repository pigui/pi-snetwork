import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Post } from '../entities/post';
import { CreatePostCommand } from './create-post.command';
import { PostRepository } from '../repositories/post.repository';
import { PostFactory } from '../factories/post.factory';
import {
  Observable,
  iif,
  lastValueFrom,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { PostAggregateRoot } from '../root/post.root';
import { Inject, NotFoundException } from '@nestjs/common';
import { USERS_MESSAGE_BROKER } from '../constants/message-broker';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserMessages } from '@app/shared/common/messages';
import type { User } from '@app/shared/entities';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, Post>
{
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
    private readonly publisher: EventPublisher,
    @Inject(USERS_MESSAGE_BROKER) private readonly usersClient: ClientProxy
  ) {}
  execute(command: CreatePostCommand): Promise<Post> {
    const createPost = this.postFactory.create(
      command.title,
      command.description,
      command.user.id
    );

    const post$ = this.usersClient
      .send<User>(UserMessages.FIND_BY_ID, {
        id: command.user.id,
      })
      .pipe(
        switchMap((user: User) => {
          return iif(
            () => !!user,
            this.postRepository.create(createPost).pipe(
              map((postCreated: Post) => {
                const PostModel =
                  this.publisher.mergeClassContext(PostAggregateRoot);
                const model = new PostModel();
                model.create(postCreated);
                model.commit();
                return postCreated;
              })
            ),
            throwError(() => new RpcException(new NotFoundException()))
          );
        })
      );
    return lastValueFrom(post$);
  }
}
