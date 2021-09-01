import Story from '../models/storyModel';
import handle from '../../utils/error';
import {
  postStory, getStory, putStory, deleteStory,
} from './storyController';

jest.mock('../models/storyModel');
jest.mock('../../utils/error');

describe('Given a postStory function', () => {
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
        (Story.create as jest.Mock)
          .mockResolvedValue({});
        await postStory(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Story.create as jest.Mock)
          .mockRejectedValue({});
        await postStory(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getStory function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { authorId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Story.findById as jest.Mock)
          .mockResolvedValue({});
        await getStory(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Story.findById as jest.Mock)
          .mockRejectedValue({});
        await getStory(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a putStory function', () => {
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
        (Story.findByIdAndUpdate as jest.Mock)
          .mockResolvedValue({});
        await putStory(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Story.findByIdAndUpdate as jest.Mock)
          .mockRejectedValue({});
        await putStory(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteStory function', () => {
  describe('When is invoked', () => {
    const req: any = { query: { authorId: '' } };
    const res: any = {
      status: jest.fn(),
      send: jest.fn(),
    };
    describe('And resolves', () => {
      test('Then "res.send" is called', async () => {
        (Story.findByIdAndDelete as jest.Mock)
          .mockResolvedValue({});
        await deleteStory(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And revokes', () => {
      test('Then "handle" is called', async () => {
        (Story.findByIdAndDelete as jest.Mock)
          .mockRejectedValue({});
        await deleteStory(req, res);

        expect(handle).toHaveBeenCalled();
      });
    });
  });
});
