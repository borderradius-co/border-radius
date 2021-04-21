import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

// const fonts = { mono: `'Menlo', monospace` }

const fonts = {heading: 'roboto', body: 'roboto'}
//needs change
const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: '#16161D',
    divar: '#E8D6CB',
  },
  fonts,
  breakpoints,
})

export default theme
