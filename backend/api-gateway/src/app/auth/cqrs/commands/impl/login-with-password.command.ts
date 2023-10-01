import { Command } from '@backend/cqrs';
import { LoginWithPasswordInput } from '../../../dto';

export class LoginWithPasswordCommand extends Command<LoginWithPasswordInput> {
  constructor(public readonly payload: LoginWithPasswordInput) {
    super();
  }
}
