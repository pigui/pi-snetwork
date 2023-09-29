import { Logger } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
export abstract class Command<T = unknown> implements ICommand {
  public readonly logger = new Logger(
    Object.getPrototypeOf(this).constructor.name as string
  );
  public readonly uid: string = uuidv4();
  public readonly payload?: T | undefined;
}
