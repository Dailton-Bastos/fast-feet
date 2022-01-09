import React from 'react'

import { useAuthContext } from '~/contexts/AuthContext'

const Deliveries = () => {
  const { user } = useAuthContext()

  return <h1>Deliveries: {user?.email}</h1>
}

export default Deliveries
