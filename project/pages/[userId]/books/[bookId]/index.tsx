/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from 'next-auth/client';
import styles from '../../../../styles/Index.module.scss';
import api from '../../../../utils/apiRoutes';
import slice from '../../../../utils/slice';
import redirect from '../../../../utils/redirect';

export default function Book({
  session, books, fullName, image, userId, bookId,
}: any) {
  const [loggedUser, setLoggedUser] = useState(false);
  useEffect(() => {
    if (session.user.id === userId) setLoggedUser(true);
  }, []);
  const { stories, title } = books
    .filter((book: any) => book._id === bookId)[0];
  const storyDelete = (id: any) => (
    <li className={styles.information__button}>
      <button
        className={styles.button}
        onClick={async () => {
          await axios.delete(api.STORY + id);
          window.location.reload();
        }}
        type="submit"
      >
        D
      </button>
    </li>
  );
  return (
    <main>
      <ul className={styles.main}>
        {stories.map((story: any) => (
          <li>
            <ul className={styles.story}>
              <li>
                <ul className={styles.first}>
                  <li>
                    <ul className={styles.first__information}>
                      <li><Image alt="profile" className={styles.information__image} src={image} width="18" height="18" /></li>
                      <Link href={`/${userId}`}>
                        <li className={styles.information__name}>
                          {fullName}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${bookId}`}>
                        <li className={styles.information__book}>
                          {title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <li>
                    <ul className={styles.first__information}>
                      <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                        <li className={styles.first__date}>{slice(story.date)}</li>
                      </Link>
                      <li className={styles.information__button}>
                        <button
                          className={styles.button}
                          onClick={async () => {
                            const link = `http://localhost:3000/${userId}/books/${bookId}/${story._id}`;
                            await navigator.clipboard.writeText(link);
                          }}
                          type="submit"
                        >
                          S
                        </button>
                      </li>
                      {loggedUser && storyDelete(story._id)}
                    </ul>
                  </li>
                </ul>
              </li>
              <li className={styles.second}>
                <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                  <a className={styles.second__element}>
                    {story.body}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return redirect;
  const { params: { userId, bookId } } = context;
  const { data: { books, fullName, image } } = await axios.get(api.USER + userId);
  return {
    props: {
      session, userId, bookId, books, fullName, image,
    },
  };
}
