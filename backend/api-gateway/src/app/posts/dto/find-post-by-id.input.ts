import { GraphQLTypes } from '@backend/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class FindPostByIdInput implements GraphQLTypes.FindPostByIdInput {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
