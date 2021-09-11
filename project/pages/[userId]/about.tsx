import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import aboutStyles from '../../styles/About.module.scss';
import api from '../../utils/apiRoutes';

export default function About({
  about, image, fullName, userId,
}: any) {
  return (
    <main>
      <ul className={aboutStyles.about}>
        <li>
          <ul className={aboutStyles.about__information}>
            <li><Image className={aboutStyles.information__image} src={image} width="18" height="18" /></li>
            <Link href={`/${userId}`}>
              <li className={aboutStyles.information__name}>
                {fullName}
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
  const { params: { userId } } = context;
  const { data: { about, image, fullName } } = await axios.get(api.USER + userId);
  return {
    props: {
      about, image, fullName, userId,
    },
  };
}
