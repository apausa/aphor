import Author from '../models/authorModel';
import handle from '../../utils/error';
import {
  postAuthor, getAuthor, putAuthor, deleteAuthor,
} from './authorController';

jest.mock('../../utils/error');
jest.mock('../models/authorModel');

describe('Given a postAuthor function', () => {
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
        (Author.create as jest.Mock)
          .mockResolvedValue({});
        await postAuthor(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (Author.create as jest.Mock)
          .mockRejectedValue({});
        await postAuthor(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getAuthor function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { authorId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };

    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Author.findById as jest.Mock)
          .mockResolvedValue({});
        await getAuthor(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (Author.findById as jest.Mock)
          .mockRejectedValue({});
        await getAuthor(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a "putAuthor" function', () => {
  describe('When is invoked', () => {
    const req: any = {
      query: { authorId: '' },
      body: {},
    };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Author.findByIdAndUpdate as jest.Mock)
          .mockResolvedValue({});
        await putAuthor(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (Author.findByIdAndUpdate as jest.Mock)
          .mockRejectedValue({});
        await putAuthor(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a "deleteAuthor" function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { authorId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Author.findByIdAndDelete as jest.Mock)
          .mockResolvedValue({});
        await deleteAuthor(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (Author.findByIdAndDelete as jest.Mock)
          .mockRejectedValue({});
        await deleteAuthor(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});
