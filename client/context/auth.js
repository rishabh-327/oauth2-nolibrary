import { useState, useRef, createContext } from 'react'

import serverInstance from '../services/server'

const params = {
  response_type: '',
  redirect_uri: '',
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  state: process.env.NEXT_PUBLIC_SECRET_STATE,
  scope: 'openid email profile',
  prompt: 'consent',
}
const authEndpoint = process.env.NEXT_PUBLIC_AUTH_ENDPOINT

const initialValue = {
  user: {},
  isLoggedIn: false,
  isServerLogin: false,
  loginClient: () => {},
  loginServer: () => {},
  logout: () => {},
  updateLoginState: () => {},
}

const authContext = createContext(initialValue)

const AuthProvider = ({ children }) => {
  const [isServerLogin, setIsServerLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const formRef = useRef()

  const updateLoginState = (isLogin, user = {}, isServerBasedLogin = false) => {
    setIsLoggedIn(isLogin)
    setUser(user)
    setIsServerLogin(isServerBasedLogin)
  }

  const loginClient = () => {
    formRef.current.response_type.value = 'token'
    formRef.current.redirect_uri.value = `${process.env.NEXT_PUBLIC_CLIENT_URL}/basic-rdr`
    formRef.current.submit()
  }

  const loginServer = async () => {
    const { data } = await serverInstance.get('/auth/initiate-auth')

    // Initiate a new auth flow only if there's no session stored already
    if (data.fresh) {
      if (!data.state) {
        console.error(
          'Anti-Forgery Token not received from server. Check your server!'
        )
        return
      }

      formRef.current.state.value = data.state
      formRef.current.response_type.value = 'code'
      formRef.current.redirect_uri.value = `${process.env.NEXT_PUBLIC_CLIENT_URL}/server-rdr`
      formRef.current.submit()
      return
    }

    // This line will be reached only if the user logged-in earlier and has an active session
    // In this case the server will respond with the user info directly without initiating a new auth flow
    updateLoginState(true, data.user, true)
  }

  const logout = async () => {
    if (isServerLogin) {
      await serverInstance.get('/auth/logout')
    }

    updateLoginState(false)
    location.href = '/'
  }

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        user,
        loginClient,
        loginServer,
        logout,
        updateLoginState,
      }}
    >
      {/* Using the 'Form' submission to initiate the auth-flow and properly redirect to auth-server's page*/}
      <form ref={formRef} method="get" action={authEndpoint}>
        {Object.keys(params).map(k => {
          return <input key={k} name={k} value={params[k]} type="hidden" />
        })}
      </form>
      {children}
    </authContext.Provider>
  )
}

export default authContext
export { AuthProvider }
