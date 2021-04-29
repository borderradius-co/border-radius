import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import "@fontsource/roboto";
import { AppProps } from "next/app";




function MyApp({ Component, pageProps }:AppProps) {
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
