import React from 'react'

import { Can } from '~/components/Can'
import { useAuthContext } from '~/contexts/AuthContext'
import { setupAPIClient } from '~/services/api'
import { api } from '~/services/apiClient'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Deliveries = () => {
  const { user, signOut } = useAuthContext()

  React.useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <h1>Deliveries: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <p>Deliveries</p>
      </Can>
    </>
  )
}

export default Deliveries

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/me')
  console.log(response.data)

  return {
    props: {},
  }
})
