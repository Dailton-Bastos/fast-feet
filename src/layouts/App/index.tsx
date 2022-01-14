import React from 'react'

import { Header } from '~/components/Header'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export const appLayout = (page: React.ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
