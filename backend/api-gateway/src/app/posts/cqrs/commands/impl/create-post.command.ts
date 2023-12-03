import { Command } from '@backend/cqrs';
import { CreatePostInput } from '../../../dto';
import { PayloadWithUserId } from '../../../../common';

export class CreatePostCommand extends Command<
  PayloadWithUserId<CreatePostInput>
> {
  constructor(public readonly payload: PayloadWithUserId<CreatePostInput>) {
    super();
  }
}
