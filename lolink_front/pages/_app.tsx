import '../../styles/global.css'
import Head from 'next/head'
import type { AppProps as NextAppProps } from 'next/app'
import { useRef } from 'react'
import Layout from '../Components/Layouts/Layout'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
// import '@testing-library/jest-dom/extend-expect';

type AppProps = NextAppProps & {
  pageProps: {
    dehydratedState: DehydratedState;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: true,
        }
      }
    });
  }

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
