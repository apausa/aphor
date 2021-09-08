/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import bookStyles from '../../../../styles/index.module.scss';

export default function Book({ data, userId, bookId }: any) {
  const { books, name, image } = data;
  const { stories, title } = books
    .filter((book: any) => book._id === bookId)[0];
  return (
    <main>
      <ul className={bookStyles.main}>
        {stories.map((story: any) => (
          <li>
            <ul className={bookStyles.story}>
              <li>
                <ul className={bookStyles.first}>
                  <li>
                    <ul className={bookStyles.first__information}>
                      <li><Image className={bookStyles.information__image} src={image} width="18" height="18" /></li>
                      <Link href={`/${userId}`}>
                        <li className={bookStyles.information__name}>
                          {name}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                        <li className={bookStyles.information__story}>
                          {story.title}
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${bookId}`}>
                        <li className={bookStyles.information__book}>
                          from,
                          {' '}
                          {title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                    <li className={bookStyles.first__date}>{story.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={bookStyles.second}>
                <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                  <a className={bookStyles.second__element}>
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
