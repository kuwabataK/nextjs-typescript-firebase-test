import * as React from 'react'
import { NextPageContext } from 'next'
import Layout from '../components/Layout'
import { User } from '../interfaces'
import { findData } from '../utils/sample-api'
import firebase from '../utils/firebase'
import { auth } from '../store/store'
import { observer } from 'mobx-react'

type Props = {
  item?: User
  errors?: string
}

@observer
class InitialPropsDetail extends React.Component<Props> {

  static getInitialProps = async ({ query }: NextPageContext) => {
    try {
      const { id } = query
      const item = await findData(Array.isArray(id) ? id[0] : id)
      return { item }
    } catch (err) {
      return { errors: err.message }
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      auth.setUser(user)
    })
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }

  logout() {
    firebase.auth().signOut()
  }

  render() {
    const { item, errors } = this.props
    const { user } = auth

    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      )
    }

    return (
      <Layout
        title={`${item ? item.name : 'Detail'} | Next.js + TypeScript Example`}
      >
        <p className="App-intro">
          UID: {user ? user.uid : ''}
        </p>

        {user && user.uid === '' ?
          (<button>now Loading...</button>)
          : user ? (
            <button onClick={this.logout}>Google Logout</button>
          ) : (
              <button onClick={this.login}>Google Login</button>
            )}
      </Layout>
    )
  }
}

export default InitialPropsDetail
