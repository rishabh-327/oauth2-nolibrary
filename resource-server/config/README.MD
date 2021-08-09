### Configuration properties info:

---

- Create a file named `default.json` in the `/config` directory.
- Set the values for the following properties as per your local setup
```json
{
  "auth": {
    "client_id": "YOUR GOOGLE APP'S CLIENT_ID",// (find it in Google Developer Console)
    "client_secret": "YOUR GOOGLE APP'S CLIENT_SECRET", // (find it in Google Developer Console)
    "redirect_uri": "http://localhost:3000/server-rdr ", // this must match with your frontend route to which you're redirected after getting the 'CODE'
    "discovery": "https://accounts.google.com/.well-known/openid-configuration", // not required for this app. But it can be used to get the auth-enpoints dynamically
    "auth_uri": "https://accounts.google.com/o/oauth2/auth", // can be used AS IS
    "token_uri": "https://oauth2.googleapis.com/token", // can be used AS IS
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", // can be used AS IS
    "user_info": "https://openidconnect.googleapis.com/v1/userinfo" // can be used AS IS
  },
  "db": {
    "connectionString": "mongodb://127.0.0.1:27017" // MongoDB connection string
  },
  "session-secret": "bd79f0fbadcf33e50dcc222877140ff2", // any random value works here
  "client_url": "http://localhost:3000" // URL at which you're frontend app is running
}
```
- Make sure [config](https://www.npmjs.com/package/config) package is added to the project.
- Properties can be accessed in the app as below
```javascript
const config = require('config')

const clientSecret = config.get('auth.client_secret')
```