import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import authContext from '../context/auth'
import serverInstance from '../services/server'

const ServerRedirect = () => {
  const auth = useContext(authContext)
  const router = useRouter()

  useEffect(() => {
    const query = router.asPath.split('?')[1]
    const queryMap = new URLSearchParams(query)

    const reqBody = {
      code: queryMap.get('code'),
      state: queryMap.get('state'),
      scope: queryMap.get('scope'),
    }

    serverInstance
      .post('/auth/callback', reqBody, {
        withCredentials: true,
      })
      .then(({ data }) => {
        auth.updateLoginState(true, data.user, true)
        router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1 className="title">Server Redirect</h1>
      <Link href="/">
        <a>← Home</a>
      </Link>
    </>
  )
}

export default ServerRedirect
