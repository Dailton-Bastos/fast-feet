import React from 'react'

import { Header } from '~/components/Header'
import { useAuthContext } from '~/contexts/AuthContext'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Deliveries = () => {
  const { user } = useAuthContext()

  return (
    <>
      <Header />
      <h1>Name: {user?.name}</h1>
      <h1>Email: {user?.email}</h1>
      <h1>Avatar: {user?.avatar}</h1>
    </>
  )
}

export default Deliveries

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  }
})
