import type { NextApiRequest, NextApiResponse } from 'next';
import Story from '../models/storyModels';
import handle from '../../utils/error';

export const postStory = async ( // Create a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdStory = await Story.create(body);
    res.status(200).json(createdStory);
  } catch (error) { handle.call(this, res, error); }
};

export const getStory = async ( // Retrieves a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId } } = req;
  try {
    const story = await Story.findById(storyId);
    res.status(200).json(story);
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
    res.status(200).json(updatedStory);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteStory = async ( // Deletes an story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId } } = req;
  try {
    await Story.findByIdAndDelete(storyId);
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
