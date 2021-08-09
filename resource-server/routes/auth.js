const { Router } = require('express')
const crypto = require('crypto')
const axios = require('axios')
const config = require('config')

const authConfig = config.get('auth')
const authStateValidation = require('../middlewares/authStateValidation')

const authRouter = Router()

// Generates an anti-forgery token(STATE) to validate the 'AUTHORIZATION_CODE' in next step.
authRouter.get('/initiate-auth', async (req, res) => {
  // For fresh authentication requests
  if (!req.session.access_token) {
    const state = crypto.randomBytes(20).toString('hex')
    req.session.state = state
    res.status(200).json({
      fresh: true,
      state,
    })
    return
  }

  try {
    // If an access_token already exists in the session, then try to get user info directly 
    const userInfo = await getUserInfo(req.session.access_token)

    res.status(200).json({
      fresh: false,
      user: {
        name: userInfo.name,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        email: userInfo.email,
        picture: userInfo.profile || userInfo.picture,
      },
    })
    return

  } catch (error) {
    // If the token present in the session is expired, then initiate a new auth-flow
    const state = crypto.randomBytes(20).toString('hex')
    req.session.state = state
    res.status(200).json({
      fresh: true,
      state,
    })
  }
})

// Receives the Auth server's response, validates the STATE of response, gets an ACCESS_TOKEN, and fetches the USER_INFO
authRouter.post('/callback', authStateValidation, async (req, res) => {
  const authorization_code = req.body.code

  if (!authorization_code) {
    res.status(400).json({
      error: 'INVALID REQUEST',
    })
    return
  }

  try {
    // Fetching the Access_Token
    const { data } = await axios.post(authConfig.token_uri, {
      code: authorization_code,
      client_id: authConfig.client_id,
      client_secret: authConfig.client_secret,
      redirect_uri: authConfig.redirect_uri,
      grant_type: 'authorization_code',
    })

    if (!data.access_token) {
      res
        .status(401)
        .json({ error: 'Unable to authorize with the Auth server.' })
      return
    }

    // Set ACCESS_TOKEN in the session to make Authorized requests afterwards
    req.session.access_token = data.access_token
    // Clear the STATE session value, as it is no longer needed after getting the ACCSES_TOKEN
    req.session.state = undefined

    // Decode ID_TOKEN to get USER_INFO
    // const userInfo = Buffer.from(data.id_token.split('.')[1], 'base64').toString();

    /* OR */

    // Fetch USER_INFO using UserInfo Google API exdpoint using ACCESS_TOKEN
    const userInfo = await getUserInfo(data.access_token)

    res.status(200).json({
      user: {
        name: userInfo.name,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
        email: userInfo.email,
        picture: userInfo.profile || userInfo.picture,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

authRouter.get('/logout', (req, res) => {
  req.session.destroy()
  res.status(200).json({ message: 'Logged out!' })
})

async function getUserInfo(access_token) {
  const { data: userInfo } = await axios.get(config.get('auth.user_info'), {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
  return userInfo
}

module.exports = authRouter
