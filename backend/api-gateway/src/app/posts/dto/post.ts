import { GraphQLTypes } from '@backend/graphql';
import { User } from '../../auth/dto';

export class Post implements GraphQLTypes.Post {
  _id: string;
  user: User;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
