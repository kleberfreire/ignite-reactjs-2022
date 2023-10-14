import { globalStyles } from '@/styles/global'

import { SessionProvider } from "next-auth/react"

globalStyles()


export default function App({
              // @ts-ignore
      Component,
      // @ts-ignore
              pageProps: { session, ...pageProps },
            }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}