import { Injectable } from '@nestjs/common';
import { CommandBus as NestCommandBus } from '@nestjs/cqrs';
import { Command } from './lib/models';

@Injectable()
export class CommandBus {
  constructor(private readonly commandBus: NestCommandBus) {}

  execute<R>(command: Command): Promise<R> {
    return this.commandBus.execute<Command, R>(command);
  }
}
