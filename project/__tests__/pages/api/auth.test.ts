import User from '../../../lib/models/userModel';
import loginHandler from '../../../pages/api/auth/login';

jest.mock('../../../lib/models/userModel');

describe('Given a "handler" function', () => {
  describe('When is invoked', () => {
    const res: any = { status: jest.fn(), send: jest.fn() };
    describe('If "req.method" is POST', () => {
      const req: any = { method: 'POST', body: { email: '', password: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (User.findOne as jest.Mock).mockResolvedValue({});
          await loginHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (User.findOne as jest.Mock).mockRejectedValue({});
          await loginHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
    });
  });
});
