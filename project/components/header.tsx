/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Header.module.scss';
import api from '../utils/apiRoutes';

export default function Header() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [reading, setReading] = useState(false);
  const { route, query: { userId } } = useRouter();
  const handleSearch = async ({ which, target: { value } }: any) => {
    if (which === 13 && value) router.push(`/search/${value}`);
  }; // If the user 'follows'.
  const user = (session?.user.id === userId);
  const handleRead = async () => {
    const { data } = await axios.get(api.USER + session?.user.id);
    data.authors.unshift(userId);
    await axios.put(api.USER + session?.user.id, { data });
    setReading(true);
  }; // If the user 'unfollows'.
  const handleReading = async () => {
    const { data } = await axios.get(api.USER + session?.user.id);
    const index = data.authors.indexOf(userId);
    data.authors.splice(index, 1);
    await axios.put(api.USER + session?.user.id, { data });
    setReading(false);
  }; // User page, logic.
  useEffect(() => {
    if ((!session) || (user && (route.startsWith('/[userId]') === false))) return;
    (async () => {
      const { data: { authors } } = await axios.get(api.USER + session?.user.id);
      const author = !!(authors.find(({ _id }: any) => _id === userId));
      setReading(author);
    })();
  }, [reading]);
  // User page, structure.
  const userPage = () => (
    <ul className={styles.page__user}>
      <li>
        <Link href={`/${userId}`}>
          <a className={styles.user__main}>Profile</a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href={`/${userId}/books`}>
          <a className={
            (route.startsWith('/[userId]/books'))
              ? styles.other__linkon
              : styles.other__linkoff
          }
          >
            Books
          </a>
        </Link>
      </li>
      {!user && !reading && (
        <li className={styles.user__button}>
          <button
            className={styles.button__off}
            onClick={handleRead}
            type="submit"
          >
            Read
          </button>
        </li>
      )}
      {!user && reading && (
        <li className={styles.user__button}>
          <button
            className={styles.button__on}
            onClick={(handleReading)}
            type="submit"
          >
            Reading
          </button>
        </li>
      )}
      {user && (
      <li className={styles.user__button}>
        <button
          className={styles.button__off}
          onClick={() => signOut()}
          type="submit"
        >
          Sign out
        </button>
      </li>
      )}
    </ul>
  ); // Not found page, structure.
  const notFoundPage = () => (
    <ul className={styles.page__dashboard}>
      <li>404, not found.</li>
    </ul>
  ); // Search page, structure.
  const searchPage = () => (
    <ul className={styles.page__dashboard}>
      <li>Search.</li>
    </ul>
  ); // Dashboard page, structure.
  const dashboardPage = () => (
    <ul className={styles.page__dashboard}>
      <li data-testid="dashboard">
        <Link href="/">
          <a className={styles.dashboard__link}>Dashboard</a>
        </Link>
      </li>
    </ul>
  ); // Library page, structure.
  const libraryPage = () => (
    <ul className={styles.page__user}>
      <li>
        <Link href="/library">
          <a className={styles.user__main}>Library</a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href="/library/books">
          <a className={
            (route.startsWith('/library/books'))
              ? styles.other__linkon
              : styles.other__linkoff
          }
          >
            Books
          </a>
        </Link>
      </li>
      <li className={styles.user__other}>
        <Link href="/library/authors">
          <a className={
            (route.startsWith('/library/authors'))
              ? styles.other__linkon
              : styles.other__linkoff
          }
          >
            Authors

          </a>
        </Link>

      </li>
    </ul>
  ); // Logged in user, structure.
  const loggedIn = () => (
    <ul className={styles.logged}>
      <li className={styles.logged__component}>
        <input
          className={styles.component__input}
          type="search"
          name="q"
          placeholder="Search"
          onKeyPress={handleSearch}
        />
      </li>
      <li className={styles.logged__component}>
        <Link href="/library">
          <a>
            <Image
              className={styles.image}
              src="https://ibb.co/Qvx6dfg"
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
              src={`${session?.user.image}`}
              width="32"
              height="32"
            />
          </a>
        </Link>
      </li>
    </ul>
  );
  return (
    <header>
      <ul className={styles.main}>
        <li data-testid="icon">
          <Link href="/">
            <a>
              <Image
                className={styles.image}
                src="https://ibb.co/pLKm9DH"
                width="32"
                height="32"
              />
            </a>
          </Link>
        </li>
        <li className={styles.page}>
          {session && (route.startsWith('/search')) && searchPage()}
          {session && (route.startsWith('/[userId]')) && userPage()}
          {session && (route.startsWith('/library')) && libraryPage()}
          {session && (route === '/404') && notFoundPage()}
          {session && (route === '/') && dashboardPage()}
        </li>
        <li>
          {session && loggedIn()}
        </li>
      </ul>
    </header>
  );
}
