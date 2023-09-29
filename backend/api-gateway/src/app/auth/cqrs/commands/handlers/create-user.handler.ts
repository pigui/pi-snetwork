import { CommandHandler, ICommandHandler } from '@backend/cqrs';
import { CreateUserCommand } from '../impl';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  execute(command: CreateUserCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
