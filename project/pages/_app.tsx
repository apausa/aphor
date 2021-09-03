/* eslint-disable react/jsx-props-no-spreading */

import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
