import '@/styles/global.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layouts/Layout'
import Head from 'next/head'
import { useEffect } from 'react'
import axios from 'axios'
import { userState } from '@/stores/user';
// import '@testing-library/jest-dom/extend-expect';

export default function App({ Component, ...pageProps }: AppProps) {
  const { state, setState } = userState();

  useEffect(() => {
    if (sessionStorage.getItem('lolink') && !state) {
      axios.get('http://localhost:3333/user/me', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('lolink')}`
        }
      }).then((res) => setState(res.data));
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta
            name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
