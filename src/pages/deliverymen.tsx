import React from 'react'

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
  async () => {
    return {
      props: {},
    }
  },
  {
    permissions: ['deliverymen.list'],
    roles: ['administrator'],
  }
)
