import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FitAlliance Pro" />
        <meta property="og:description" content="Build a fitness community with programs, member progress, and coach tools — built for trainers and studio owners." />
        <meta property="og:url" content="https://fitalliance-pro.lxsaihub.com/" />
        <meta property="og:image" content="https://fitalliance-pro.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FitAlliance Pro" />
        <meta name="twitter:description" content="Build a fitness community with programs, member progress, and coach tools — built for trainers and studio owners." />
        <meta name="twitter:image" content="https://fitalliance-pro.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"FitAlliance Pro","url":"https://fitalliance-pro.lxsaihub.com/","description":"Build a fitness community with programs, member progress, and coach tools — built for trainers and studio owners.","applicationCategory":"BusinessApplication","operatingSystem":"Web"}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
