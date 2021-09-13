/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from 'next-auth/client';
import styles from '../../../../styles/Index.module.scss';
import api from '../../../../utils/apiRoutes';
import slice from '../../../../utils/date';

export default function Story({
  session, books, fullName, image, userId, bookId, storyId,
}: any) {
  const something = books
    .filter((book: any) => book._id === bookId)[0];
  const { title, date, body } = something.stories
    .filter((story: any) => story._id === storyId)[0];
  const loggedUser = (session.user.id === userId);
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
                <li><Image className={styles.information__image} src={image} width="18" height="18" /></li>
                <Link href={`/${userId}`}>
                  <li className={styles.information__name}>
                    {fullName}
                    .
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}`}>
                  <li className={styles.information__book}>
                    {something.title}
                    {' '}
                    /
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}/${storyId}`}>
                  <li className={styles.information__story}>
                    {title}
                    .
                  </li>
                </Link>
              </ul>
            </li>
            <li>
              <ul className={styles.first__information}>
                <Link href={`/${userId}/books/${bookId}/${storyId}`}>
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
  const { data: { books, fullName, image } } = await axios
    .get(api.USER + userId);
  return {
    props: {
      session, userId, bookId, storyId, books, fullName, image,
    },
  };
}
