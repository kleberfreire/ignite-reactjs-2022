import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'
import Head from 'next/head'
import logoImg from '@/assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Link from 'next/link'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Ignite Shop</title>
        <meta name="description" content="Ignite Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <Link href='/'>
            <img src={logoImg.src} alt="Logo Ignite Shop"  />
          </Link>
        </Header>

        <Component {...pageProps} />
      </Container>
    </>
  )
}
