/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { getSession } from 'next-auth/client';
import userStyles from '../../styles/Index.module.scss';

export default function User({ data, userId }: any) {
  const { books, name, image } = data;
  return (
    <main>
      <ul className={userStyles.main}>
        {books.map((book: any) => book.stories.map((story: any) => (
          <li>
            <ul className={userStyles.story}>
              <li>
                <ul className={userStyles.first}>
                  <li>
                    <ul className={userStyles.first__information}>
                      <li><Image className={userStyles.information__image} src={image} width="18" height="18" /></li>
                      <Link href={`/${userId}`}>
                        <li className={userStyles.information__name}>
                          {name}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${book._id}/${story._id}`}>
                        <li className={userStyles.information__story}>
                          {story.title}
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${book._id}`}>
                        <li className={userStyles.information__book}>
                          from,
                          {' '}
                          {book.title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${book._id}/${story._id}`}>
                    <li className={userStyles.first__date}>{story.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={userStyles.second}>
                <Link href={`/${userId}/books/${book._id}/${story._id}`}>
                  <a className={userStyles.second__element}>
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
  const session = await getSession(context);
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { session, data, userId } };
}
