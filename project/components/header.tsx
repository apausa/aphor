/* eslint-disable no-console */
import React from 'react';
import { getSession } from 'next-auth/client';

export default function Header() {
  return <div className="header">Works</div>;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log('>>>>>>>>', session);
  return { props: { session } };
}
