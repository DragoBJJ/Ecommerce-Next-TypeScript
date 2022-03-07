import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LayoutTemplate } from '../templates/LayoutTemplate'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {

  const client = new QueryClient()
  return  (
    <QueryClientProvider client={client}>
    <LayoutTemplate>
       <Component  {...pageProps}  />
    </LayoutTemplate>
    </QueryClientProvider>
  )
    
}

export default MyApp
