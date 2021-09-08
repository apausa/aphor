/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

export default function Header() {
  const [session, loading] = useSession();
  const { route } = useRouter();
  const userPage = () => (
    <ul className={styles.page__user}>
      <li>
        <Link href={`/${session?.user.id}`}>
          <a className={styles.user__main}>{session?.user.name}</a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href={`/${session?.user.id}/books`}>
          <a className={styles.other__link}>Books</a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href={`/${session?.user.id}/about`}>
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
    <ul>
      <li><Link href="/library"><a>Library</a></Link></li>
      <li><Link href="/library/books"><a>Books</a></Link></li>
      <li><Link href="/library/authors"><a>Authors</a></Link></li>
    </ul>
  );
  const loggedIn = () => (
    <ul className={styles.logged}>
      <li className={styles.logged__component}><Image className={styles.image} src="http://placehold.it/32x32" width="32" height="32" /></li>
      <li className={styles.logged__component}>
        <Link href="/library">
          <a><Image className={styles.image} src="http://placehold.it/32x32" width="32" height="32" /></a>
        </Link>
      </li>
      <li>
        <Link href={`/${session?.user.id}`}>
          <a><Image className={styles.image} src="http://placehold.it/32x32" width="32" height="32" /></a>
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
            <a><Image className={styles.image} src="http://placehold.it/32x32" width="32" height="32" /></a>
          </Link>
        </li>
        <li className={styles.page}>
          {session && (route === '/') && dashboardPage()}
          {session && (route.startsWith('/[userId]')) && userPage()}
          {session && (route === '/library') && libraryPage()}
        </li>
        <li>
          {session && loggedIn()}
          {!session && loggedOut()}
        </li>
      </ul>
    </header>
  );
}
