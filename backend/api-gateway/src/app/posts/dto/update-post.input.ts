import { GraphQLTypes } from '@backend/graphql';

export class UpdatePostInput implements GraphQLTypes.UpdatePostInput {
  _id: string;
  text: string;
}
