/*
import User from '../lib/models/userModel';
import handle from '../utils/error';
import {
  postUser, getUser, putUser, deleteUser,
} from './userController';

jest.mock('../../utils/error');
jest.mock('../models/userModel');

describe('Given a postUser function', () => {
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
        (User.create as jest.Mock)
          .mockResolvedValue({});
        await postUser(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (User.create as jest.Mock)
          .mockRejectedValue({});
        await postUser(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getUser function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { userId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };

    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (User.findById as jest.Mock)
          .mockResolvedValue({});
        await getUser(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (User.findById as jest.Mock)
          .mockRejectedValue({});
        await getUser(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a "putUser" function', () => {
  describe('When is invoked', () => {
    const req: any = {
      query: { userId: '' },
      body: {},
    };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (User.findByIdAndUpdate as jest.Mock)
          .mockResolvedValue({});
        await putUser(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (User.findByIdAndUpdate as jest.Mock)
          .mockRejectedValue({});
        await putUser(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a "deleteUser" function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { userId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (User.findByIdAndDelete as jest.Mock)
          .mockResolvedValue({});
        await deleteUser(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then "handle" is called', async () => {
        (User.findByIdAndDelete as jest.Mock)
          .mockRejectedValue({});
        await deleteUser(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});
*/
