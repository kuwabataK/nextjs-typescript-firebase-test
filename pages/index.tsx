import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import store from '../store/store'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>
        Hello Next.js 👋
        <p>loginUser: {store.childStore.user && store.childStore.user.displayName}</p>
        <p>conter: {store.counterStore.counter}</p>
      </h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <p>
        <Link href="/fuga">
          <a>fuga</a>
        </Link>
      </p>
      <p>
        <Link href="/fuga2">
          <a>fuga2</a>
        </Link>
      </p>
      <p>
        <Link href="/timeout">
          <a>timeout</a>
        </Link>
      </p>
      <p>
        <Link href="/counter">
          <a>カウンターアプリ</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
