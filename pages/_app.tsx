import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayoutTemplate } from '../templates/LayoutTemplate'
import { QueryClient, QueryClientProvider } from 'react-query'

import {DefaultSeo} from 'next-seo'
import  NextSeo from "../next-seo-config"


function MyApp({ Component, pageProps }: AppProps) {

  const client = new QueryClient()
  return  (
       <LayoutTemplate>
          <DefaultSeo {...NextSeo}/>
    <QueryClientProvider client={client}>
       <Component  {...pageProps}  />
    </QueryClientProvider>
       </LayoutTemplate>
  )
    
}

export default MyApp
