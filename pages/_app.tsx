import '../styles/globals.css'
import "../styles/All.css";
import type { AppProps } from 'next/app'
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const isBrowser = typeof window !== 'undefined';

const wsLink = isBrowser ? new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
})) : undefined;

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

// https://www.apollographql.com/docs/react/data/subscriptions/
const splitLink = wsLink ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (<ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>);

}

export default MyApp
