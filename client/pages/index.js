import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import authContext from '../context/auth'

export default function Home() {
  const { loginClient, loginServer, logout, user, isLoggedIn } =
    useContext(authContext)

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      {isLoggedIn && (
        <div className="profile">
          <div className="profile-pic">
            {user.picture || user.profile ? (
              <Image
                width="48"
                height="48"
                src={user.picture || user.profile}
              ></Image>
            ) : null}
          </div>
          <h3>{user?.name}</h3>
        </div>
      )}

      <h1 className="title">OAuth 2.0 Playground</h1>

      <div>
        {isLoggedIn ? (
          <button className="button" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <button className="button" onClick={loginClient}>
              Login - Client Side
              <hr />
              <small>Implicit Flow</small>
            </button>

            <button className="button" onClick={loginServer}>
              Login - Server Side
              <hr />
              <small>Authorization Code Flow</small>
            </button>
          </>
        )}
      </div>
    </>
  )
}
