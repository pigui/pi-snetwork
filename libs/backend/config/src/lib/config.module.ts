import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigFactory,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

@Module({
  imports: [NestConfigModule],
  exports: [NestConfigModule],
})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [NestConfigModule.forRoot()],
      exports: [NestConfigModule],
    };
  }

  static forFeature(config: ConfigFactory): DynamicModule {
    return {
      module: ConfigModule,
      imports: [NestConfigModule.forFeature(config)],
      exports: [NestConfigModule],
    };
  }
}
