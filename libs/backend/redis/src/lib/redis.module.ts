import { DynamicModule, Module } from '@nestjs/common';
import Redis from 'ioredis';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './redis.module-definition';

@Module({
  providers: [Redis],
  exports: [Redis],
})
export class RedisModule extends ConfigurableModuleClass {
  static register(option: typeof OPTIONS_TYPE): DynamicModule {
    return {
      ...super.register(option),
      providers: [
        { provide: Redis, useValue: new Redis(option.port, option.host) },
      ],
    };
  }
  static registerAsync(option: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    console.log(option);
    return {
      ...super.registerAsync(option),
    };
  }
}
