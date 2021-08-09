import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import authContext from '../context/auth'

const BasicRedirect = () => {
  const auth = useContext(authContext)

  const router = useRouter()

  useEffect(() => {
    const response = router.asPath.split('#')[1]
    if (!response) router.replace('/')

    const resMap = new URLSearchParams(response)

    axios
      .get(process.env.NEXT_PUBLIC_USERINFO_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${resMap.get('access_token')}`,
        },
      })
      .then(({ data }) => {
        auth.updateLoginState(true, data, false)
        router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1 className="title">Basic Redirect</h1>
      <Link href="/">
        <a>← Home</a>
      </Link>
    </>
  )
}

export default BasicRedirect
