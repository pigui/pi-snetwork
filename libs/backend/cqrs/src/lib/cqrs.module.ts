import { DynamicModule, Module } from '@nestjs/common';
import { CqrsModule as NestCqrsModule } from '@nestjs/cqrs';
import { QueryBus } from '../query-bus';
import { CommandBus } from '../command-bus';

@Module({
  imports: [CqrsModule],
  providers: [QueryBus, CommandBus],
  exports: [CqrsModule, QueryBus, CommandBus],
})
export class CqrsModule {
  static forRoot(): DynamicModule {
    return {
      module: CqrsModule,
      imports: [NestCqrsModule.forRoot()],
      exports: [CqrsModule],
    };
  }
}
