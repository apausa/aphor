import type { NextApiRequest, NextApiResponse } from 'next';
import Story from '../models/storyModels';
import handle from '../../utils/error';

export const postStory = async ( // Create a story, (from book).
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId }, body } = req;
  try {
    body.bookId = bookId;
    const createdStory = await Story.create(body);
    res.status(200);
    res.json(createdStory);
  } catch (error) { handle.call(this, res, error); }
};

export const getStory = async ( // Retrieves a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId } } = req;
  try {
    const story = await Story.findById(storyId);
    res.status(200);
    res.json(story);
  } catch (error) { handle.call(this, res, error); }
};

export const putStory = async ( // Updates an story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId }, body } = req;
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      storyId, body, { new: true },
    );
    res.status(200);
    res.json(updatedStory);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteStory = async ( // Deletes an story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId } } = req;
  try {
    await Story.findByIdAndUpdate(storyId);
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
