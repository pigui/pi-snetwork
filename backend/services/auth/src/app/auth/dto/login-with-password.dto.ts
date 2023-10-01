import { GraphQLTypes } from '@backend/graphql';

export class LoginWithPasswordDto
  implements GraphQLTypes.LoginWithPasswordInput
{
  email: string;
  password: string;
}
