import { GraphQLTypes } from '@backend/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput implements GraphQLTypes.CreateUserInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
