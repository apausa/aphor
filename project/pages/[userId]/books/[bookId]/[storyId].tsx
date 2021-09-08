/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../../styles/Index.module.scss';

export default function Story({
  data, userId, bookId, storyId,
}: any) {
  const { books, name, image } = data;
  const something = books
    .filter((book: any) => book._id === bookId)[0];
  const { title, date, body } = something.stories
    .filter((story: any) => story._id === storyId)[0];
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
                    {name}
                    .
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}/${storyId}`}>
                  <li className={styles.information__story}>
                    {title}
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}`}>
                  <li className={styles.information__book}>
                    from,
                    {' '}
                    {something.title}
                  </li>
                </Link>
              </ul>
            </li>
            <Link href={`/${userId}/books/${bookId}/${storyId}`}>
              <li className={styles.first__date}>{date}</li>
            </Link>
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
  const { params: { userId, bookId, storyId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      userId, bookId, storyId, data,
    },
  };
}
