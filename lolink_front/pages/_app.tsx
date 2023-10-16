import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/Layout'
import Head from 'next/head'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { getUserInfo } from './api/user'
// import '@testing-library/jest-dom/extend-expect';

export default function App({ Component, ...pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  )
}
