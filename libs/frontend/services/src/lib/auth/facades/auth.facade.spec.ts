import { AuthFacade } from './auth.facade';

describe('Auth', () => {
  it('should create an instance', () => {
    expect(new AuthFacade()).toBeTruthy();
  });
});
