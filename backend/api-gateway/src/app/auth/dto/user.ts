import { GraphQLTypes } from '@backend/graphql';

export class User implements GraphQLTypes.User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
