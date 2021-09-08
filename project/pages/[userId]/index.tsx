/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from '../../styles/Index.module.scss';

export default function User({ data, userId }: any) {
  const { books, name, image } = data;
  return (
    <main>
      <ul className={styles.main}>
        {books.map((book: any) => book.stories.map((story: any) => (
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
                      <Link href={`/${userId}/books/${book._id}/${story._id}`}>
                        <li className={styles.information__story}>
                          {story.title}
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${book._id}`}>
                        <li className={styles.information__book}>
                          from,
                          {' '}
                          {book.title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${book._id}/${story._id}`}>
                    <li className={styles.first__date}>{story.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={styles.second}>
                <Link href={`/${userId}/books/${book._id}/${story._id}`}>
                  <a className={styles.second__element}>
                    {story.body}
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        )))}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { data, userId } };
}
