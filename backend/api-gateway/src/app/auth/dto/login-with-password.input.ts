import { GraphQLTypes } from '@backend/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithPasswordInput
  implements GraphQLTypes.LoginWithPasswordInput
{
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
