/*
import Book from '../lib/models/bookModel';
import handle from '../utils/error';
import bookIdHandler from '../pages/api/books/[bookId]';
import bookHandler from '../pages/api/books/index';

jest.mock('../models/bookModel');
jest.mock('../../utils/error');

describe('Given a postBook function', () => {
  describe('When is invoked', () => {
    const req: any = {
      body: {},
    };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Book.create as jest.Mock)
          .mockResolvedValue({});
        await postBook(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Book.create as jest.Mock)
          .mockRejectedValue({});
        await postBook(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getBook function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { authorId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Book.findById as jest.Mock)
          .mockResolvedValue({});
        await getBook(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Book.findById as jest.Mock)
          .mockRejectedValue({});
        await getBook(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a putBook function', () => {
  describe('When is invoked', () => {
    const req: any = {
      body: {},
      query: { authorId: '' },
    };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Book.findByIdAndUpdate as jest.Mock)
          .mockResolvedValue({});
        await putBook(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Book.findByIdAndUpdate as jest.Mock)
          .mockRejectedValue({});
        await putBook(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteBook function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { authorId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Book.findByIdAndDelete as jest.Mock)
          .mockResolvedValue({});
        await deleteBook(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Book.findByIdAndDelete as jest.Mock)
          .mockRejectedValue({});
        await deleteBook(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

*/
