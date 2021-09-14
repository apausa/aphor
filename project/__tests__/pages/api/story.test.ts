import Story from '../../../lib/models/storyModel';
import error from '../../../utils/handle';
import storyIdHandler from '../../../pages/api/story/[storyId]';
import storyHandler from '../../../pages/api/story/index';

jest.mock('../../../lib/models/storyModel');
jest.mock('../../../utils/error');

describe('Given a "handler" function', () => {
  describe('When is invoked', () => {
    const res: any = { status: jest.fn(), send: jest.fn() };
    describe("If 'req.method' is GET", () => {
      const req: any = { method: 'GET', query: { storyId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (Story.findById as jest.Mock)
            .mockReturnValue({});
          await storyIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Story.findById as jest.Mock).mockRejectedValue({});
          await storyIdHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
    describe("If 'req.method' is PUT", () => {
      const req: any = { method: 'PUT', body: {}, query: { storyId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (Story.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
          await storyIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Story.findByIdAndUpdate as jest.Mock).mockRejectedValue({});
          await storyIdHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
    describe("If 'req.method' is DELETE", () => {
      const req: any = { method: 'DELETE', query: { storyId: '' } };
      describe('And resolves', () => {
        test('Then "res.send" is called', async () => {
          (Story.findByIdAndDelete as jest.Mock).mockResolvedValue({});
          await storyIdHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Story.findByIdAndDelete as jest.Mock).mockRejectedValue({});
          await storyIdHandler(req, res);

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
          (Story.create as jest.Mock).mockResolvedValue({});
          await storyHandler(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
      describe('And revokes', () => {
        test('Then "error" is called', async () => {
          (Story.create as jest.Mock).mockRejectedValue({});
          await storyHandler(req, res);

          expect(error).toHaveBeenCalled();
        });
      });
    });
  });
});
