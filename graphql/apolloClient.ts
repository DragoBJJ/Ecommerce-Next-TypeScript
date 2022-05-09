import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ENDPOINT,
  cache: new InMemoryCache()
});

export const apolloAuthorizedClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`
  }
});
