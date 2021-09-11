/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import Story from '../../../lib/models/storyModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    const { body: { storyTitle, storyBody } } = req;
    try {
      const createdStory = await Story
        .create({ title: storyTitle, body: storyBody });
      res.status(200);
      res.send(createdStory);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);

/*
      const newStoryId = createdStory._id.toString();
      const { data } = await axios // Get the book.
        .get(`http://localhost:3000/api/book/${bookId}`);
      console.log('THE PROBLEM IS IN THE CONDITION, FIND VALUE OF DATA', data);
      if (!data) { // Update book.
        data.stories.unshift(newStoryId);
        await axios
          .put(`http://localhost:3000/api/book/${bookId}`, { data });
      } else { // Create book.
        const createdBook = await axios
          .post('http://localhost:3000/api/book', {
            title: bookId,
            stories: [newStoryId],
          });
        const newBookId = createdBook.data._id.toString();
        const { data } = await axios // Get the user.
          .get(`http://localhost:3000/api/user/${userId}`);
        data.books.unshift(newBookId);
        await axios // Update the user.
          .put(`http://localhost:3000/api/user/${userId}`, { data });
      }
      */
