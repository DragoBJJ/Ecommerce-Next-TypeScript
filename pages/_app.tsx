import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayoutTemplate } from '../templates/LayoutTemplate'
import { QueryClient, QueryClientProvider } from 'react-query'

import {DefaultSeo} from 'next-seo'
import  NextSeo from "../next-seo-config"
import { CartContextProvider } from '../components/context/CartContext'
import { ApolloProvider } from '@apollo/client'
import {apolloClient} from "../graphql/apolloClient"
import { ClientContextProvider, UseClientContext } from '../components/context/ClientContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient()

   const { clientID } = UseClientContext();
  return  (
     <ApolloProvider client={apolloClient}>
        <ClientContextProvider>
     <CartContextProvider>
       <LayoutTemplate>
          <DefaultSeo {...NextSeo}/>
    <QueryClientProvider client={client}>
         <Elements stripe={promise}>
       <Component  {...pageProps}  />
       </Elements>
    </QueryClientProvider>
       </LayoutTemplate>
       </CartContextProvider>
       </ClientContextProvider>
       </ApolloProvider>
  )
    
}

export default MyApp
