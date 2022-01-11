import React from 'react'

import { setupAPIClient } from '~/services/api'
import { withSSRAuth } from '~/utils/withSSRAuth'

const Deliverymen = () => {
  return (
    <>
      <h1>Deliverymen</h1>
    </>
  )
}

export default Deliverymen

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/me')

    return {
      props: {},
    }
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
)
