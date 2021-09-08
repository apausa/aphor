/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/Index.module.scss';

export default function Books({
  name, image, books, userId,
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
                          {name}
                          .
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${book._id}`}>
                        <li className={styles.information__book}>
                          {book.title}
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${book._id}/`}>
                    <li className={styles.first__date}>{book.date}</li>
                  </Link>
                </ul>
              </li>
              <li className={styles.second}>
                <Link href={`/${userId}/books/${book._id}`}>
                  <a className={styles.second__element}><Image src={book.image} width="180" height="180" /></a>
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
  const { params: { userId } } = context;
  const { data: { name, image, books } } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      userId, name, image, books,
    },
  };
}
