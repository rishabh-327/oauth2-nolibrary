### OAuth 2.0 Flows - No OAuth Library used

---

This is a minimal project made just to understand the steps involved in 2 authorization flows defined in OAuth 2.0 spec. `Goolge` is used as the authorization provider for this project.

This project implements the following OAuth 2.0 flows:
- Implicit Flow
- Authorization Code Flow

---

#### Steps to run the project
1. Sign in to [Google Cloud Console](https://console.cloud.google.com) and create a new project.
2. Navigate to `APIs and services > OAuth consent screen` and fill in mandatory information about your application.
  2.1 For scopes select `openid`, `/auth/userinfo.email` and `/auth/userinfo.email`
  2.2 Add a few gmail-ids to test your application
3. Navigate to `APIs and services` > `Credentials` > `+ CREATE CREDENTIALS` > `OAuth client ID`
  3.1 Select **Web Application** as the Application Type
  3.2 For **Authorised JavaScript origins**, add the address of the frontend(*client*) project.
  3.2 For **Authorised redirect URIs**, add the URLs of redirect routes i.e. `http:localhost:3000/basic-rdr`(for implicit flow) and `http:localhost:3000/server-rdr`(for auth code flow).
4. Go through the `README.md` of both the apps and set the configurations as mentioned.
5. Run both the applications.

---

### References
- https://oauth.net/2/
- https://datatracker.ietf.org/doc/html/rfc6749
