import React from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

type ReactDispatch = React.Dispatch<React.SetStateAction<boolean>>

type ContextData = {
  isLoading: boolean
  setIsLoading: ReactDispatch
  isFetching: boolean
  setIsFetching: ReactDispatch
}

export const QueryContext = React.createContext({} as ContextData)

export const QueryContextProvider = ({ children }: QueryProviderProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isFetching, setIsFetching] = React.useState(false)

  return (
    <QueryContext.Provider
      value={{ isLoading, setIsLoading, isFetching, setIsFetching }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export const useQueryContext = () => React.useContext(QueryContext)
