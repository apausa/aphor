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
import write from '../styles/Write.module.scss';
import api from '../utils/apiRoutes';
import slice from '../utils/slice';

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
      <div className={write.main}>
        <form className={write.form}>
          <fieldset className={write.fieldset__top}>
            <div className={write.top__information}>
              <Link href={`/${id}`}>
                <a>
                  <Image
                    className={write.information__image}
                    alt="profile"
                    src={image}
                    width="18"
                    height="18"
                  />
                </a>
              </Link>
              <div>
                <input
                  className={write.information__title}
                  type="text"
                  value={storyTitle}
                  onChange={handleStoryTitle}
                  placeholder="Title"
                  required
                />
              </div>
            </div>
            <div>
              <textarea
                value={storyBody}
                className={write.top__textarea}
                onChange={handleStoryBody}
                placeholder="Write your story!"
                required
              />
            </div>
          </fieldset>
          <fieldset className={write.fieldset__bottom}>
            <input
              className={write.bottom__book}
              list="bookId"
              value={bookId}
              onChange={handleBookId}
              placeholder="Book."
              required
            />
            <datalist id="bookId">
              {books.map((book: any) => (
                <option value={book._id}>{book.title}</option>
              ))}
            </datalist>
            <button
              className={write.bottom__publish}
              onClick={onSubmit}
              type="button"
            >
              Publish.
            </button>
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
                          alt="profile"
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
                  <li>
                    <ul className={styles.first__information}>
                      <Link href={`/${user._id}/books/${book._id}/${story._id}`}>
                        <li className={styles.first__date}>{slice(story.date)}</li>
                      </Link>
                      <li className={styles.information__button}>
                        <button
                          className={styles.button}
                          onClick={async () => {
                            const link = `http://localhost:3000/${user._id}/books/${book._id}/${story._id}`;
                            await navigator.clipboard.writeText(link);
                          }}
                          type="submit"
                        >
                          S
                        </button>
                      </li>
                    </ul>
                  </li>
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
