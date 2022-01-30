import React from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AppStorage } from '~/contexts'
import { mockApi } from '~/mock-api'
import { AppPropsWithLayout } from '~/utils/types'

const ENV = process.env.NODE_ENV

if (ENV === 'development') mockApi({ environment: 'development' })

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AppStorage>
      {getLayout(<Component {...pageProps} />)}

      <ReactQueryDevtools />
    </AppStorage>
  )
}

export default MyApp
