/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

export default function Header() {
  const [session, loading] = useSession();
  const { route, query: { userId } } = useRouter();
  const router = useRouter();
  const handle = async ({ which, target: { value } }: any) => {
    if (which === 13 && value) router.push(`/search/${value}`);
  };

  const userPage = () => (
    <ul className={styles.page__user}>
      <li>
        <Link href={`/${userId}`}>
          <a className={styles.user__main}>Profile</a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href={`/${userId}/books`}>
          <a className={styles.other__link}>Books</a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href={`/${userId}/about`}>
          <a className={styles.other__link}>About</a>
        </Link>
      </li>
    </ul>
  );
  const dashboardPage = () => (
    <ul className={styles.page__dashboard}>
      <li>
        <Link href="/">
          <a className={styles.dashboard__link}>Dashboard</a>
        </Link>
      </li>
    </ul>
  );
  const libraryPage = () => (
    <ul className={styles.page__user}>
      <li>
        <Link href="/library">
          <a className={styles.user__main}>Library</a>
        </Link>

      </li>
      <li className={styles.user__other}>
        <Link href="/library/books">
          <a className={styles.other__link}>Books</a>
        </Link>

      </li>
      <li className={styles.user__other}>
        <Link href="/library/authors">
          <a className={styles.other__link}>Authors</a>
        </Link>

      </li>
    </ul>
  );
  const loggedIn = () => (
    <ul className={styles.logged}>
      <li className={styles.logged__component}>
        <input
          type="search"
          name="q"
          placeholder="Search"
          onKeyPress={handle}
        />
      </li>
      <li className={styles.logged__component}>
        <Link href="/library">
          <a>
            <Image
              className={styles.image}
              src="http://placehold.it/32x32"
              width="32"
              height="32"
            />
          </a>
        </Link>
      </li>
      <li>
        <Link href={`/${session?.user.id}`}>
          <a>
            <Image
              className={styles.image}
              src="http://placehold.it/32x32"
              width="32"
              height="32"
            />
          </a>
        </Link>
      </li>
    </ul>
  );
  const loggedOut = () => (
    <Link href="/api/auth/signin"><a>Sign in</a></Link>
  );
  return (
    <header>
      <ul className={styles.main}>
        <li>
          <Link href="/">
            <a>
              <Image
                className={styles.image}
                src="http://placehold.it/32x32"
                width="32"
                height="32"
              />
            </a>
          </Link>
        </li>
        <li className={styles.page}>
          {session && (route === '/') && dashboardPage()}
          {session && (route.startsWith('/[userId]')) && userPage()}
          {session && (route.startsWith('/library')) && libraryPage()}
        </li>
        <li>
          {session && loggedIn()}
          {!session && loggedOut()}
        </li>
      </ul>
    </header>
  );
}
