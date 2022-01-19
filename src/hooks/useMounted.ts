import React from 'react'

export const useMounted = (): { hasMounted: boolean } => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return { hasMounted }
}
