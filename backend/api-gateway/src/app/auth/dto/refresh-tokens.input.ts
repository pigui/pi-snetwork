import { GraphQLTypes } from '@backend/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensInput implements GraphQLTypes.RefreshTokensInput {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
