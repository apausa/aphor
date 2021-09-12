/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import styles from '../../../styles/Index.module.scss';
import api from '../../../utils/apiRoutes';
import slice from '../../../utils/date';

export default function Books({
  session, fullName, image, books, userId,
}: any) {
  const loggedUser = (session.user.id === userId);
  const bookDelete = (id: any) => (
    <li>
      <button
        onClick={async () => {
          await axios.delete(api.BOOK + id);
          window.location.reload();
        }}
        type="submit"
      >
        Delete.
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
                      <li><Image className={styles.information__image} src={image} width="18" height="18" /></li>
                      <Link href={`/${userId}`}>
                        <li className={styles.information__name}>
                          {fullName}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${book._id}`}>
                        <li className={styles.information__book}>
                          {book.title}
                          .
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <Link href={`/${userId}/books/${book._id}/`}>
                        <li className={styles.first__date}>{slice(book.date)}</li>
                      </Link>
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
  const { data: { fullName, image, books } } = await axios.get(api.USER + userId);
  return {
    props: {
      session, userId, fullName, image, books,
    },
  };
}
