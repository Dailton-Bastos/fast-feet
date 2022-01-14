import React from 'react'

import { useAuthContext } from '~/contexts/AuthContext'
import { appLayout } from '~/layouts/App'
import { NextPageWithLayout } from '~/utils/types'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Deliveries: NextPageWithLayout = () => {
  const { user } = useAuthContext()

  return (
    <>
      <h1>Name: {user?.name}</h1>
      <h1>Email: {user?.email}</h1>
      <h1>Avatar: {user?.avatar}</h1>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})

Deliveries.getLayout = appLayout

export default Deliveries
