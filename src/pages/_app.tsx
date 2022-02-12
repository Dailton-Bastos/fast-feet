import React from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Head } from '~/components/Head'
import { AppStorage } from '~/contexts'
import { mockApi } from '~/mock-api'
import { AppPropsWithLayout } from '~/utils/types'

const ENV = process.env.NODE_ENV

if (ENV === 'development') mockApi({ environment: 'development' })

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AppStorage>
      <Head
        title="Frete e Entregas"
        description="FastFeet - Suas encomendas com segurança e velocidade."
      />
      {getLayout(<Component {...pageProps} />)}

      <ReactQueryDevtools />
    </AppStorage>
  )
}

export default MyApp
