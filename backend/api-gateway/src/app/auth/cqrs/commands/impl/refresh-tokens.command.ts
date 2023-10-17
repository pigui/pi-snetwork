import { Command } from '@backend/cqrs';
import { RefreshTokensInput } from '../../../dto';

export class RefreshTokensCommand extends Command<RefreshTokensInput> {
  constructor(public readonly payload: RefreshTokensInput) {
    super();
  }
}
