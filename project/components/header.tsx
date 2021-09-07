/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ data }: any) {
  const [session, loading] = useSession();
  const { route } = useRouter();
  const userPage = () => (
    <ul>
      <li><Link href={`/${session?.user.id}`}><a>{session?.user.name}</a></Link></li>
      <li><Link href={`/${session?.user.id}/books`}><a>Books</a></Link></li>
      <li><Link href={`/${session?.user.id}/about`}><a>About</a></Link></li>
    </ul>
  );
  const dashboardPage = () => (
    <ul>
      <li>Dashboard</li>
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
    <ul>
      <li>Explore</li>
      <li><Link href="/library"><a>Library</a></Link></li>
      <li><Link href={`/${session?.user.id}`}><a>Profile</a></Link></li>
    </ul>
  );
  const loggedOut = () => (
    <Link href="/api/auth/signin"><a>Sign in</a></Link>
  );
  return (
    <header>
      <ul>
        <li><Link href="/"><a>Project</a></Link></li>
        <li>
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
