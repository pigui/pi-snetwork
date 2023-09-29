import { GraphQLTypes } from '@backend/graphql';

export class CreateUserInput implements GraphQLTypes.CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
