/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/Index.module.scss';
import api from '../../../utils/apiRoutes';

export default function Books({
  fullName, image, books, userId,
}: any) {
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
                  <Link href={`/${userId}/books/${book._id}/`}>
                    <li className={styles.first__date}>{book.date}</li>
                  </Link>
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
  const { params: { userId } } = context;
  const { data: { fullName, image, books } } = await axios.get(api.USER + userId);
  return {
    props: {
      userId, fullName, image, books,
    },
  };
}
