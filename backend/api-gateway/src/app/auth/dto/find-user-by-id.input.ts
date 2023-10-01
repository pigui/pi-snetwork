import { GraphQLTypes } from '@backend/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindUserByIdInput implements GraphQLTypes.FindUserByIdInput {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
