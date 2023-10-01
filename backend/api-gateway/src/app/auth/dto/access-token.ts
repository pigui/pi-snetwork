import { GraphQLTypes } from '@backend/graphql';

export class AccessToken implements GraphQLTypes.AccessToken {
  accessToken: string;
  refreshToken: string;
  user: GraphQLTypes.User;
}
