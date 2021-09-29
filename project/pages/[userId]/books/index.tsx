/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import styles from '../../../styles/Index.module.scss';
import api from '../../../utils/apiRoutes';
import slice from '../../../utils/slice';

export default function Books({
  session, userId, fullName, image, books,
}: any) {
  const [loggedUser, setLoggedUser] = useState(false);
  useEffect(() => {
    if (!session) return;
    if (session.user.id === userId) setLoggedUser(true);
  }, []);
  const bookDelete = (id: any) => (
    <li className={styles.information__button}>
      <button
        className={styles.button}
        onClick={async () => {
          await axios.delete(api.BOOK + id);
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
      <ul className={styles.main}>
        {books.map((book: any) => (
          <li>
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
                      <Link href={`/${userId}/books/${book._id}`} passHref>
                        <li className={styles.information__book}>
                          {book.title}
                          .
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <li>
                    <ul className={styles.first__information}>
                      <Link href={`/${userId}/books/${book._id}/`} passHref>
                        <li className={styles.first__date}>{slice(book.date)}</li>
                      </Link>
                      <li className={styles.information__button}>
                        <button
                          className={styles.button}
                          onClick={async () => {
                            const link = `http://localhost:3000/${userId}/books/${book._id}`;
                            await navigator.clipboard.writeText(link);
                          }}
                          type="submit"
                        >
                          S
                        </button>
                      </li>
                      {loggedUser && bookDelete(book._id)}
                    </ul>
                  </li>
                </ul>
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
  const { data } = await axios.get(api.USER + userId);
  if (!data) return { redirect: { destination: '/404' } };
  const { fullName, image, books } = data;
  return {
    props: {
      session, userId, fullName, image, books,
    },
  };
}
