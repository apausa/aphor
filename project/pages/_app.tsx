/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import React from 'react';
import Head from 'next/head';
import Header from '../components/header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Aphor</title>
        <meta name="description" content="Aphor is a Fullstack social network built on Next.js, where users can write books in real time, like aphorisms, poems and short stories." />
        <meta property="og:title" content="Aphor" />
        <meta property="og:description" content="Aphor is a Fullstack social network built on Next.js, where users can write books in real time, like aphorisms, poems and short stories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
