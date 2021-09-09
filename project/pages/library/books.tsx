/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import redirect from '../../utils/redirect';
import styles from '../../styles/Index.module.scss';

export default function Books({ users }: any) {
  return (
    <main>
      <ul className={styles.main}>
        {users.map((user: any) => user.books.map((book: any) => (
          <li>
            <ul className={styles.story}>
              <li>
                <ul className={styles.first}>
                  <li>
                    <ul className={styles.first__information}>
                      <li><Image className={styles.information__image} src={user.image} width="18" height="18" /></li>
                      <Link href={`/${user._id}/books/${book._id}`}>
                        <li className={styles.information__book}>
                          {book.title}
                          {' '}
                          /
                        </li>
                      </Link>
                      <Link href={`/${user._id}`}>
                        <li className={styles.information__name}>
                          {user.name}
                          .
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${user._id}/books/${book._id}/`}>
                    <li className={styles.first__date}>{book.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={styles.second}>
                <Link href={`/${user._id}/books/${book._id}`}>
                  <a className={styles.second__element}><Image src={book.image} width="180" height="180" /></a>
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
  // Secure pages server side.
  if (!session) return redirect;
  // Retrieve logged user.
  const { user: { id } } = session;
  // Retrieve followed authors.
  const { data: { authors } } = await axios
    .get(`http://localhost:3000/api/user/${id}`);
  const promises = authors.map(({ _id }: any) => axios
    .get(`http://localhost:3000/api/user/${_id}`));
  const keep: any = await Promise.allSettled(promises);
  const users = keep.map(({
    value: {
      data: {
        _id, image, books, name,
      },
    },
  }: any) => ({
    _id, image, books, name,
  }));
  return { props: { users } };
}
