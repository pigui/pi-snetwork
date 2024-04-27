import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/application/users.module';
import configurations from './configs/configurations';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersInfraestructureModule } from './users/infraestructure/users-infraestructure.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({ load: [configurations] }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const uri = `${configService.get('DATABASE_URL')}:${configService.get(
          'DATABASE_PORT'
        )}/users`;
        return {
          uri,
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    UsersInfraestructureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
