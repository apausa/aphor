import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { getSession } from 'next-auth/client';
import aboutStyles from '../../styles/About.module.scss';

export default function About({ data, userId }: any) {
  const { about, image, name } = data;
  return (
    <main>
      <ul className={aboutStyles.about}>
        <li>
          <ul className={aboutStyles.about__information}>
            <li><Image className={aboutStyles.information__image} src={image} width="18" height="18" /></li>
            <Link href={`/${userId}`}>
              <li className={aboutStyles.information__name}>
                {name}
                .
              </li>
            </Link>
          </ul>
        </li>
        <li className={aboutStyles.about__text}>
          {about}
        </li>
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
