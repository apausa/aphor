/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import styles from '../../../../styles/Index.module.scss';

export default function Book({ data, userId, bookId }: any) {
  const { books, name, image } = data;
  const { stories, title } = books
    .filter((book: any) => book._id === bookId)[0];
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
                      <li><Image className={styles.information__image} src={image} width="18" height="18" /></li>
                      <Link href={`/${userId}`}>
                        <li className={styles.information__name}>
                          {name}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                        <li className={styles.information__story}>
                          {story.title}
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${bookId}`}>
                        <li className={styles.information__book}>
                          from,
                          {' '}
                          {title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                    <li className={styles.first__date}>{story.date}</li>
                  </Link>
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
  const { params: { userId, bookId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      session, userId, bookId, data,
    },
  };
}
