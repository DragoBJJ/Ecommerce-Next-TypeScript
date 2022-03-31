import { ApolloClient, InMemoryCache } from "@apollo/client";

const API =
  "https://api-eu-central-1.graphcms.com/v2/cl1dyhtj41m9101xf3ek70yk3/master";

export const apolloClient = new ApolloClient({
  uri: API,
  cache: new InMemoryCache()
});
