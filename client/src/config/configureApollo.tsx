import { FC } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

function configureApollo() {
  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/gql-api',
  });

  const webSocketLink = new WebSocketLink({
    uri: 'ws://localhost:5000/gql-api',
    options: {
      reconnect: true,
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      const isSubscription = definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription';

      return isSubscription;
    },
    webSocketLink,
    // httpLink,
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        const isSubscription = definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription';

        return isSubscription;
      },
      httpLink,
      httpLink
    ),
  );

  const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });

  const Provider: FC = ({ children }) => (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );

  return Provider;
}

export { configureApollo };
