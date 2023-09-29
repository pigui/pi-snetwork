import { GraphQLTypes } from '@backend/graphql';

export class FindUserByIdInput implements GraphQLTypes.FindUserByIdInput {
  _id: string;
}
