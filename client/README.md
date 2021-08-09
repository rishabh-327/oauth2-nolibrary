### OAuth 2.0 - Client

###### Provider - Google

---

This app plays the role of a **Client** of OAuth2.0 spec.

This project implements two Authentication flows of OAuth2.0:

- Implicit Flow
- Authorization Code Flow

---

#### Steps to run the app:

1. Create a file named `env.local` at the root of the project.
2. Add these two Environment Variables and assign them the values as per your project's settings.

```
NEXT_PUBLIC_CLIENT_ID=<YOUR PROJECT'S CLIENT_ID>
NEXT_PUBLIC_SECRET_STATE=<ANY RANDOM STRING> //This is only used for implicit flow
```

3. Run the app in development mode: `yarn dev`

---

This is a [Next.js](https://nextjs.org/) app generated using `create-next-app`
