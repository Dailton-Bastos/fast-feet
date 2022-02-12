import React from 'react'

import { Spinner, SpinnerProps } from '@chakra-ui/react'

type LoadingProps = SpinnerProps

export const Loading = ({ ...rest }: LoadingProps) => {
  return <Spinner {...rest} />
}
