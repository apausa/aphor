/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import booksStyles from '../../../styles/index.module.scss';

export default function Books({ data, userId }: any) {
  const { name, image, books } = data;
  return (
    <main>
      <ul className={booksStyles.main}>
        {books.map((book: any) => (
          <li>
            <ul className={booksStyles.story}>
              <li>
                <ul className={booksStyles.first}>
                  <li>
                    <ul className={booksStyles.first__information}>
                      <li><Image className={booksStyles.information__image} src={image} width="18" height="18" /></li>
                      <Link href={`/${userId}`}>
                        <li className={booksStyles.information__name}>
                          {name}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${book._id}`}>
                        <li className={booksStyles.information__book}>
                          {book.title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${book._id}/`}>
                    <li className={booksStyles.first__date}>{book.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={booksStyles.second}>
                <Link href={`/${userId}/books/${book._id}`}>
                  <a className={booksStyles.second__element}><Image src={book.image} width="180" height="180" /></a>
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
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { session, userId, data } };
}
