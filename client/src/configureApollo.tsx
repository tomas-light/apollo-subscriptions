import { FC } from 'react';
import { v4 as uuid } from 'uuid';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const sessionId = uuid();
console.log('sessionID', sessionId);

function configureApollo(baseUri: string = 'localhost:5000') {
  const httpLink = new HttpLink({
    uri: `http://${baseUri}/gql-api`,
  });

  const webSocketLink = new WebSocketLink({
    uri: `ws://${baseUri}/gql-api`,
    options: {
      reconnect: true,
      connectionParams: {
        sessionId,
      },
    },
  });

  // const splitLink = split(
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     const isSubscription = definition.kind === 'OperationDefinition' &&
  //       definition.operation === 'subscription';
  //
  //     return isSubscription;
  //   },
  //   webSocketLink,
  //   split(
  //     ({ query }) => {
  //       const definition = getMainDefinition(query);
  //
  //       const isMutation = definition.kind === 'OperationDefinition' && definition.operation === 'mutation';
  //       const subscriptionMutationNames = ['UpdateUser'];
  //
  //       const shouldRedirectToWebsockets = isMutation && subscriptionMutationNames.includes(definition.name.value);
  //
  //       return shouldRedirectToWebsockets;
  //     },
  //     webSocketLink,
  //     httpLink
  //   ),
  // );

  const apolloClient = new ApolloClient({
    link: webSocketLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  const Provider: FC = ({ children }) => (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );

  const key = uuid();

  return [Provider, key];
}

export { configureApollo };
