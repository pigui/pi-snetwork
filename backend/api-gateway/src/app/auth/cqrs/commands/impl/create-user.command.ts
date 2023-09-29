import { Command } from '@backend/cqrs';
import { CreateUserInput } from '../../../dto';

export class CreateUserCommand extends Command<CreateUserInput> {
  constructor(public readonly payload: CreateUserInput) {
    super();
  }
}
