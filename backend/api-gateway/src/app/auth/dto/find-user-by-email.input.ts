import { GraphQLTypes } from '@backend/graphql';

export class FindUserByEmailInput implements GraphQLTypes.FindUserByEmailInput {
  email: string;
}
