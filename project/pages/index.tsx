/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import redirect from '../utils/redirect';
import styles from '../styles/Index.module.scss';

export default function Dashboard({
  id, users, books, image,
}: any) {
  return (
    <main>
      <div>
        <Link href={`/${id}`}>
          <a>
            <Image
              src={image}
              width="16"
              height="16"
            />
          </a>
        </Link>
        <form name="write" id="write">
          <textarea name="body" placeholder="Write your story." />
          <fieldset>
            <input list="book" name="bookId" placeholder="Select a book" />
            <datalist id="book">
              {books.map((book: any) => (
                <option
                  value={book._id}
                >
                  {book.title}
                </option>
              ))}
            </datalist>
            <button
              form="write"
              type="submit"
              formAction="http://localhost:3000/api/story"
              formMethod="POST"
              formTarget="_blank"
              name="userId"
              value={id}
            >
              Hola
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
  const { data: { authors, books, image } } = await axios
    .get(`http://localhost:3000/api/user/${id}`);

  const promises = authors.map(({ _id }: any) => axios
    .get(`http://localhost:3000/api/user/${_id}`));
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
