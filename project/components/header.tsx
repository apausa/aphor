/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ data }: any) {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log(router);
  return (
    <header>
      <div />
      <ul>
        <li>Name</li>
        <li>Profile</li>
        <li>Books</li>
      </ul>
      <ul>
        <li />
        <li />
        <li />
      </ul>

    </header>
  );
}
