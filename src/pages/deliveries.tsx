import React from 'react'

import { useAuthContext } from '~/contexts/AuthContext'
import { api } from '~/services/api'

const Deliveries = () => {
  const { user } = useAuthContext()

  React.useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  }, [])

  return <h1>Deliveries: {user?.email}</h1>
}

export default Deliveries
