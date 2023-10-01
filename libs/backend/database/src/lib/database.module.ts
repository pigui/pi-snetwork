import { ConfigModule } from '@backend/config';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            return {
              uri: configService.get('MONGO_URL'),
            };
          },
          imports: [ConfigModule],
          inject: [ConfigService],
        }),
      ],
    };
  }

  static forFeature(models?: ModelDefinition[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [MongooseModule.forFeature(models)],
      exports: [MongooseModule],
    };
  }
}
