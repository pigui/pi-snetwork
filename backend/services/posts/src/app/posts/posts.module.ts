import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DatabaseModule } from '@backend/database';
import { PostDocument, PostSchema } from './models';
import { PostsRepository } from './repositories';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: PostDocument.name, schema: PostSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
