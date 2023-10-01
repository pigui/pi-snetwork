import { GraphQLTypes } from '@backend/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput implements GraphQLTypes.CreateUserInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
