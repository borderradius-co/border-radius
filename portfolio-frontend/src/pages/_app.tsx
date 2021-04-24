import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import "@fontsource/roboto";



function MyApp({ Component, pageProps }) {
  return (

   <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      ></ColorModeProvider>
        <Component {...pageProps} />
    </ChakraProvider>
   
 
  )
}

export default MyApp
