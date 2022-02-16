import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { Server } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { execute, subscribe } from 'graphql';
import { apolloResolvers } from '../ApolloController';

import { typeDefs } from './typeDefs';

async function configureApollo(app: Express, httpServer: Server) {
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: apolloResolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: '/gql-api'
  })

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    onConnect: (connectionParams, webSocket, context) => {
      console.log('connected', connectionParams.sessionId);
      context.sessionId = connectionParams.sessionId;
      return { sessionId: connectionParams.sessionId }
    },
    onDisconnect: (webSocket, context) => {
      console.log('disconnected', context.sessionId);
    }
  }, {
    server: httpServer,
    path: apolloServer.graphqlPath
  });

  return apolloServer;
}

export { configureApollo };
