/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import Image from 'next/image';
import storyStyles from '../../../../styles/index.module.scss';

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
      <ul className={storyStyles.story}>
        <li>
          <ul className={storyStyles.first}>
            <li>
              <ul className={storyStyles.first__information}>
                <li><Image className={storyStyles.information__image} src={image} width="18" height="18" /></li>
                <Link href={`/${userId}`}>
                  <li className={storyStyles.information__name}>
                    {name}
                    .
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}/${storyId}`}>
                  <li className={storyStyles.information__story}>
                    {title}
                  </li>
                </Link>
                <Link href={`/${userId}/books/${bookId}`}>
                  <li className={storyStyles.information__book}>
                    from,
                    {' '}
                    {something.title}
                  </li>
                </Link>
              </ul>
            </li>
            <Link href={`/${userId}/books/${bookId}/${storyId}`}>
              <li className={storyStyles.first__date}>{date}</li>
            </Link>
          </ul>
        </li>
        <li className={storyStyles.second}>
          <Link href={`/${userId}/books/${bookId}/${storyId}`}>
            <a className={storyStyles.second__element}>
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
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      session, userId, bookId, storyId, data,
    },
  };
}
