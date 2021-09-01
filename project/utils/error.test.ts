import handle from './error';

describe('Given a handleError function', () => {
  describe('When is invoked', () => {
    test('Then "res.send" is called', () => {
      const error: string = '';
      const res: any = {
        status: jest.fn(),
        send: jest.fn(),
      };
      handle(error, res);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
