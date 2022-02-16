import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { Server } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { execute, subscribe } from 'graphql';
import { ApolloController } from '../ApolloController';

import { typeDefs } from './typeDefs';

async function configureApollo(app: Express, httpServer: Server) {
  const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: new ApolloController(),
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
      console.log();
    }
  }, {
    server: httpServer,
    path: apolloServer.graphqlPath
  });

  return apolloServer;
}

export { configureApollo };
