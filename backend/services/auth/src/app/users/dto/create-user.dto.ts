import { GraphQLTypes } from '@backend/graphql';

export class CreateUserDto implements GraphQLTypes.CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
