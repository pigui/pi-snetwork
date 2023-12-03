import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@backend/config';
import { DatabaseModule } from '@backend/database';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule.forRoot(), PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
