import { GraphQLTypes } from '@backend/graphql';

export class CreatePostDto implements GraphQLTypes.CreatePostInput {
  text: string;
  userId: string;
}
