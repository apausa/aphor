/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { getSession } from 'next-auth/client';
import redirect from '../../utils/redirect';
import styles from '../../styles/Authors.module.scss';
import api from '../../utils/apiRoutes';

export default function Authors({ authors }: any) {
  return (
    <main>
      <ul className={styles.main}>
        {authors.map((author: any) => (
          <li>
            <ul className={styles.author}>
              <li><Image className={styles.author__image} src={author.image} width="18" height="18" /></li>
              <Link href={`/${author._id}`}>
                <li className={styles.author__name}>
                  {author.fullName}
                  .
                </li>
              </Link>
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return redirect;
  const { user: { id } } = session;
  const { data: { authors } } = await axios.get(api.USER + id);
  return { props: { authors } };
}
