import Head from 'next/head'
import React from 'react'

interface IProps {
  title: string;
}

const  HeadTitle = ({ title }: IProps) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default  HeadTitle