import { GraphQLTypes } from '@backend/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserByEmailInput implements GraphQLTypes.FindUserByEmailInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
