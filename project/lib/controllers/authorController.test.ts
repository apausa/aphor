import Author from '../models/authorModel';
import handle from '../../utils/error';
import {
  postAuthor,
} from './authorController';

jest.mock('../models/authorModel');
jest.mock('../../utils/error');

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
      test('Then "res.send" should be called', async () => {
        (Author.create as jest.Mock).mockResolvedValue({});
        await postAuthor(req, res);
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" should be called', async () => {
        (Author.create as jest.Mock).mockRejectedValue({});
        await postAuthor(req, res);
        expect(handle).toHaveBeenCalled();
      });
    });
  });
});
