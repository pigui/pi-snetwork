import { Type } from '@nestjs/common';

export function WithUserId<TBase extends Type>(Base: TBase, userId: string) {
  const id = userId;
  return class extends Base {
    userId: string = id;
  };
}
