/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import styles from '../../../styles/index.module.scss';

export default function Books({ data, userId }: any) {
  const { name, image } = data;
  return (
    <main>
      <ul className={styles.main}>
        {data.books.map((book: any) => (
          <li>
            <ul className={styles.story}>
              <li>
                <ul className={styles.first}>
                  <li>
                    <ul>
                      <li><Image className={styles.information__image} src={image} width="16" height="16" /></li>
                      <Link href={`/${userId}`}>
                        <li className={styles.information__name}>
                          {name}
                          .
                        </li>
                      </Link>
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
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { session, userId, data } };
}
