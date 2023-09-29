import { Injectable } from '@nestjs/common';
import { QueryBus as NestQueryBus } from '@nestjs/cqrs';
import { Query } from './lib/models';

@Injectable()
export class QueryBus {
  constructor(public readonly queryBus: NestQueryBus) {}
  execute<R>(query: Query): Promise<R> {
    return this.queryBus.execute<Query, R>(query);
  }
}
