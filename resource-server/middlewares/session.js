const config = require('config')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const storeOptions = {
  mongoUrl: config.get('db.connectionString'),
  dbName: 'oauth-playground',
}

const appSession = session({
  name: 'auth-session',
  secret: config.get('session-secret'),
  store: MongoStore.create(storeOptions),
  resave: true,
  saveUninitialized: false,
  unset: 'destroy',
  cookie: {
    maxAge: 10 * 60 * 1000,
  }
})

module.exports = appSession