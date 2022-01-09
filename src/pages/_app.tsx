import React from 'react'

import type { AppProps } from 'next/app'

import { AppStorage } from '../contexts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStorage>
      <Component {...pageProps} />
    </AppStorage>
  )
}

export default MyApp
