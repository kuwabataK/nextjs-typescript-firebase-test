import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { counterStore, childStore } from '../store/store'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>
        Hello Next.js 👋
        <p>loginUser: {childStore.user && childStore.user.displayName}</p>
        <p>conter: {counterStore.counter}</p>
      </h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
