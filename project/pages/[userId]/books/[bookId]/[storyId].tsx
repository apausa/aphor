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

export default function Story({
  session, userId, bookId, storyId, fullName, image, title, date, body,
}: any) {
  const [loggedUser, setLoggedUser] = useState(false);
  useEffect(() => {
    if (!session) return;
    if (session.user.id === userId) setLoggedUser(true);
  }, []);
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
      <ul className={styles.story}>
        <li>
          <ul className={styles.first}>
            <li>
              <ul className={styles.first__information}>
                <li><Image alt="profile" className={styles.information__image} src={image} width="18" height="18" /></li>
                <Link href={`/${userId}`} passHref>
                  <li className={styles.information__name}>
                    {fullName}
                    .
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}`} passHref>
                  <li className={styles.information__book}>
                    {title}
                  </li>
                </Link>
              </ul>
            </li>
            <li>
              <ul className={styles.first__information}>
                <Link href={`/${userId}/books/${bookId}/${storyId}`} passHref>
                  <li className={styles.first__date}>{slice(date)}</li>
                </Link>
                <li className={styles.information__button}>
                  <button
                    className={styles.button}
                    onClick={async () => {
                      const link = `http://localhost:3000/${userId}/books/${bookId}/${storyId}`;
                      await navigator.clipboard.writeText(link);
                    }}
                    type="submit"
                  >
                    S
                  </button>
                </li>
                {loggedUser && storyDelete(storyId)}
              </ul>
            </li>
          </ul>
        </li>
        <li className={styles.second}>
          <Link href={`/${userId}/books/${bookId}/${storyId}`}>
            <a className={styles.second__element}>
              {body}
            </a>
          </Link>
        </li>
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { params: { userId, bookId, storyId } } = context;
  const { data } = await axios.get(api.USER + userId);
  if (!data) return { redirect: { destination: '/404' } };
  const { books, fullName, image } = data;
  const book = books.filter(({ _id }: any) => _id === bookId)[0];
  if (!book) return { redirect: { destination: '/404' } };
  const { stories, title } = book;
  const story = stories.filter(({ _id }: any) => _id === storyId)[0];
  if (!story) return { redirect: { destination: '/404' } };
  const { date, body } = story;
  return {
    props: {
      session, userId, bookId, storyId, fullName, image, title, date, body,
    },
  };
}
