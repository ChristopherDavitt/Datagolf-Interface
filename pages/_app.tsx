import '../styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Layout from '../layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
    <ChakraProvider theme={theme} >
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </ChakraProvider>
    </>
  )
}
