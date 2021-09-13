/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import redirect from '../../utils/redirect';
import styles from '../../styles/Authors.module.scss';
import api from '../../utils/apiRoutes';

export default function Search({ data }: any) {
  const router = useRouter();
  useEffect(() => {
    if (data[0] === undefined) router.push('/404');
  }, []);
  return (
    <main>
      <ul className={styles.main}>
        {data.map((author: any) => (
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
  const { params: { params } } = context;
  const query = params[0];
  const { data } = await axios.post(api.SEARCH, { query });
  return { props: { data } };
}
