import React from 'react'

import { AppStorage } from '~/contexts'
import { AppPropsWithLayout } from '~/utils/types'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <AppStorage>{getLayout(<Component {...pageProps} />)}</AppStorage>
}

export default MyApp
