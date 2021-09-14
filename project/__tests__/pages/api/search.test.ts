import User from '../../../lib/models/userModel';
import error from '../../../utils/handle';
import searchHandler from '../../../pages/api/search/index';

jest.mock('../../../lib/models/userModel');
jest.mock('../../../utils/error');

describe('Given a "handler" function', () => {
  describe('When is invoked', () => {
    const res: any = { status: jest.fn(), send: jest.fn() };
    describe('If "req.method" is POST', () => {
      const req: any = { method: 'POST', body: {} };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (User.find as jest.Mock).mockResolvedValue({});
          await searchHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (User.find as jest.Mock).mockRejectedValue({});
          await searchHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
  });
});
