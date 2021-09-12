/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from 'next-auth/client';
import styles from '../../../../styles/Index.module.scss';
import api from '../../../../utils/apiRoutes';
import slice from '../../../../utils/date';

export default function Book({
  session, books, fullName, image, userId, bookId,
}: any) {
  const { stories, title } = books
    .filter((book: any) => book._id === bookId)[0];
  const loggedUser = (session.user.id === userId);
  const storyDelete = (id: any) => (
    <li>
      <button
        onClick={async () => {
          await axios.delete(api.STORY + id);
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
        {stories.map((story: any) => (
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
                      <Link href={`/${userId}/books/${bookId}`}>
                        <li className={styles.information__book}>
                          {title}
                          {' '}
                          /
                        </li>
                      </Link>
                      <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                        <li className={styles.information__story}>
                          {story.title}
                          .
                        </li>
                      </Link>
                    </ul>
                  </li>
                  <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                    <li className={styles.first__date}>{slice(story.date)}</li>
                  </Link>
                </ul>
              </li>
              <li className={styles.second}>
                <Link href={`/${userId}/books/${bookId}/${story._id}`}>
                  <a className={styles.second__element}>
                    {story.body}
                  </a>
                </Link>
              </li>
              <li>
                <ul>
                  {loggedUser && storyDelete(story._id)}
                  <li>
                    <button
                      onClick={async () => {
                        const link = `http://localhost:3000/${userId}/books/${bookId}/${story._id}`;
                        await navigator.clipboard.writeText(link);
                      }}
                      type="submit"
                    >
                      Share.
                    </button>
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
  const { params: { userId, bookId } } = context;
  const { data: { books, fullName, image } } = await axios.get(api.USER + userId);
  return {
    props: {
      session, userId, bookId, books, fullName, image,
    },
  };
}
