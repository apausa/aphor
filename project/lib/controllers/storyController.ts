import type { NextApiRequest, NextApiResponse } from 'next';
import Story from '../models/storyModel';
import handle from '../../utils/error';

export const postStory = async ( // Create a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdStory = await Story.create(body);
    res.status(200);
    res.send(createdStory);
  } catch (error) { handle(error, res); }
};

export const getStory = async ( // Retrieves a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId } } = req;
  try {
    const story = await Story.findById(storyId);
    res.status(200);
    res.send(story);
  } catch (error) { handle(error, res); }
};

export const putStory = async ( // Updates a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId }, body } = req;
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      storyId, body, { new: true },
    );
    res.status(200);
    res.send(updatedStory);
  } catch (error) { handle(error, res); }
};

export const deleteStory = async ( // Deletes a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { storyId } } = req;
  try {
    const deletedStory = await Story.findByIdAndDelete(storyId);
    res.status(204);
    res.send(deletedStory);
  } catch (error) { handle(error, res); }
};
