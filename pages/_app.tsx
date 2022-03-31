import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayoutTemplate } from '../templates/LayoutTemplate'
import { QueryClient, QueryClientProvider } from 'react-query'

import {DefaultSeo} from 'next-seo'
import  NextSeo from "../next-seo-config"
import { CartContextProvider } from '../components/context/CartContext'
import { ApolloProvider } from '@apollo/client'
import {apolloClient} from "../graphql/apolloClient"


function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient()
  return  (
     <ApolloProvider client={apolloClient}>
     <CartContextProvider>
       <LayoutTemplate>
          <DefaultSeo {...NextSeo}/>
    <QueryClientProvider client={client}>
       <Component  {...pageProps}  />
    </QueryClientProvider>
       </LayoutTemplate>
       </CartContextProvider>
       </ApolloProvider>
  )
    
}

export default MyApp
