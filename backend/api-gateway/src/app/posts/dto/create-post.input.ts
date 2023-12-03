import { GraphQLTypes } from '@backend/graphql';

export class CreatePostInput implements GraphQLTypes.CreatePostInput {
  text: string;
}
