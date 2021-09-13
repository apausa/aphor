import User from '../../../lib/models/userModel';
import error from '../../../utils/error';
import userIdHandler from '../../../pages/api/user/[userId]';
import userHandler from '../../../pages/api/user/index';

jest.mock('../../../lib/models/userModel');
jest.mock('../../../utils/error');

describe('Given a "handler" function', () => {
  describe('When is invoked', () => {
    const res: any = { status: jest.fn(), send: jest.fn() };
    describe("If 'req.method' is GET", () => {
      const req: any = { method: 'GET', query: { userId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (User.findById as jest.Mock)
            .mockReturnValue({
              populate: jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({}),
              }),
            });
          await userIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (User.findById as jest.Mock).mockRejectedValue({});
          await userIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
    });
    describe("If 'req.method' is PUT", () => {
      const req: any = { method: 'PUT', body: { data: {} } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
          await userIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (User.findByIdAndUpdate as jest.Mock).mockRejectedValue({});
          await userIdHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
    describe("If 'req.method' is DELETE", () => {
      const req: any = { method: 'DELETE', query: { userId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (User.findByIdAndDelete as jest.Mock).mockResolvedValue({});
          await userIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (User.findByIdAndDelete as jest.Mock).mockRejectedValue({});
          await userIdHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
  });
});

describe('Given a "handler" function', () => {
  describe('When is invoked', () => {
    const res: any = { status: jest.fn(), send: jest.fn() };
    describe('If "req.method" is POST', () => {
      const req: any = { method: 'POST', body: {} };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (User.create as jest.Mock).mockResolvedValue({});
          await userHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (User.create as jest.Mock).mockRejectedValue({});
          await userHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
  });
});
