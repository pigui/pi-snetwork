export class PayloadWithUserId<T> {
  data: T;
  userId: string;

  constructor(data: T, userId: string) {
    this.data = data;
    this.userId = userId;
  }
}
