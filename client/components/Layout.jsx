import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">{children}</main>
    </div>
  )
}

export default Layout
