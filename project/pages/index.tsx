/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import redirect from '../utils/redirect';
import styles from '../styles/Index.module.scss';
import api from '../utils/apiRoutes';

export default function Dashboard({
  id, users, books, image,
}: any) {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyBody, setstoryBody] = useState('');
  const [bookId, setBookId] = useState('');
  const handleStoryTitle = (event: any) => setStoryTitle(event.target.value);
  const handleStoryBody = (event: any) => setstoryBody(event.target.value);
  const handleBookId = (event: any) => setBookId(event.target.value);
  const onSubmit = async () => {
    const createdStory = await axios.post(api.STORY,
      { storyTitle, storyBody });
    const { data } = await axios.get(api.BOOK + bookId);
    if (data) {
      data.stories.unshift(createdStory.data._id);
      await axios.put(api.BOOK + bookId, { data });
    } else {
      const createdBook = await axios.post(api.BOOK,
        { title: bookId, stories: [createdStory.data._id] });
      const { data } = await axios.get(api.USER + id);
      data.books.unshift(createdBook.data._id);
      await axios.put(api.USER + id, { data });
    }
  };
  return (
    <main>
      <div>
        <Link href={`/${id}`}>
          <a><Image src={image} width="16" height="16" /></a>
        </Link>
        <form>
          <fieldset>
            <input
              type="text"
              value={storyTitle}
              onChange={handleStoryTitle}
              placeholder="Story title."
              required
            />
            <textarea
              value={storyBody}
              onChange={handleStoryBody}
              placeholder="Story body."
              required
            />
          </fieldset>
          <fieldset>
            <input
              list="bookId"
              value={bookId}
              onChange={handleBookId}
              placeholder="Book title."
              required
            />
            <datalist id="bookId">
              {books.map((book: any) => (
                <option value={book._id}>{book.title}</option>
              ))}
            </datalist>
            <button onClick={onSubmit} type="button">Publish.</button>
          </fieldset>
        </form>
      </div>
      <ul className={styles.main}>
        {users.map((user: any) => user.books.map((book: any) => book.stories.map((story: any) => (
          <li>
            <ul className={styles.story}>
              <li>
                <ul className={styles.first}>
                  <li>
                    <ul className={styles.first__information}>
                      <li>
                        <Image
                          className={styles.information__image}
                          src={user.image}
                          width="18"
                          height="18"
                        />
                      </li>
                      <Link href={`/${user._id}`}>
                        <li className={styles.information__name}>
                          {user.fullName}
                          .
                        </li>
                      </Link>
                      <Link href={`/${user._id}/books/${book._id}`}>
                        <li className={styles.information__book}>
                          {book.title}
                          {' '}
                          /
                        </li>
                      </Link>
                      <Link href={`/${user._id}/books/${book._id}/${story._id}`}>
                        <li className={styles.information__story}>
                          {story.title}
                          .
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${user._id}/books/${book._id}/${story._id}`}>
                    <li className={styles.first__date}>{story.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={styles.second}>
                <Link href={`/${user._id}/books/${book._id}/${story._id}`}>
                  <a className={styles.second__element}>
                    {story.body}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        ))))}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // Secure pages server side.
  if (!session) return redirect;
  // Retrieve logged user.
  const { user: { id } } = session;
  // Retrieve followed authors.
  const { data: { authors, books, image } } = await axios.get(api.USER + id);
  const promises = authors.map(({ _id }: any) => axios.get(api.USER + _id));
  const keep: any = await Promise.allSettled(promises);
  const users = keep.map(({
    value: {
      data: {
        _id, image, books, fullName,
      },
    },
  }: any) => ({
    _id, image, books, fullName,
  }));
  return {
    props: {
      id, users, books, image,
    },
  };
}
