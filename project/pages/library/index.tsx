/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import redirect from '../../utils/redirect';
import styles from '../../styles/Index.module.scss';
import api from '../../utils/apiRoutes';
import slice from '../../utils/slice';

export default function Library({ users }: any) {
  return (
    <main>
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
                          alt="profile"
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
  if (!session) return redirect;
  const { user: { id } } = session;
  const { data: { authors } } = await axios.get(api.USER + id);
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
  return { props: { users } };
}
