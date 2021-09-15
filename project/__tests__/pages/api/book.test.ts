import Book from '../../../lib/models/bookModel';
import error from '../../../utils/handle';
import bookIdHandler from '../../../pages/api/book/[bookId]';
import bookHandler from '../../../pages/api/book/index';

jest.mock('../../../lib/models/bookModel');
jest.mock('../../../utils/handle');

describe('Given a "handler" function', () => {
  describe('When is invoked', () => {
    const res: any = { status: jest.fn(), send: jest.fn() };
    describe("If 'req.method' is GET", () => {
      const req: any = { method: 'GET', query: { bookId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (Book.findById as jest.Mock)
            .mockReturnValue({
              populate: jest.fn().mockResolvedValue({}),
            });
          await bookIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Book.findById as jest.Mock).mockRejectedValue({});
          await bookIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
    });
    describe("If 'req.method' is PUT", () => {
      const req: any = { method: 'PUT', body: { data: {} } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (Book.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
          await bookIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Book.findByIdAndUpdate as jest.Mock).mockRejectedValue({});
          await bookIdHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
    describe("If 'req.method' is DELETE", () => {
      const req: any = { method: 'DELETE', query: { bookId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (Book.findByIdAndDelete as jest.Mock).mockResolvedValue({});
          await bookIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Book.findByIdAndDelete as jest.Mock).mockRejectedValue({});
          await bookIdHandler(req, res);

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
          (Book.create as jest.Mock).mockResolvedValue({});
          await bookHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Book.create as jest.Mock).mockRejectedValue({});
          await bookHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
  });
});
