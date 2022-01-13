import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.600',
    },
  },
}

const colors = {
  gray: {
    '10': '#DDDDDD',
    '50': '#F5F5F5',
    '600': '#444444',
  },
  purple: {
    '500': '#7D40E7',
  },
  red: {
    '600': '#DE3B3B',
  },
  white: '#fff',
}

const fonts = {
  heading: 'Roboto',
  body: 'Roboto',
}

export const theme = extendTheme({ styles, colors, fonts })
