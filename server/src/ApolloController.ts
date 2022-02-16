import { IResolvers } from '@graphql-tools/utils';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { User, users } from './data/users';

// Resolvers define the technique for fetching the types defined in the schema.

const subscriptionEvents = {
  onUserUpdated: 'USER_UPDATED',
};

const pubSub = new PubSub();

const apolloResolvers: IResolvers = {
  Query: {
    users: () => users,
    user: (parent, args: { id: number }, context, info) => {
      return users.find(user => user.id === args.id);
    }
  },

  Mutation: {
    updateUser: (_, { user }: { user: User }, context, info) => {
      console.log('mutation', context.sessionId);

      const storedUser = users.find(_user => _user.id === user.id);
      if (!storedUser) {
        return null;
      }

      storedUser.name = user.name;

      pubSub.publish(subscriptionEvents.onUserUpdated, {
        onUserUpdated: storedUser,
      });

      return storedUser;
    },
  },

  Subscription: {
    onUserUpdated: {
      subscribe: withFilter(
        (rootValue?: any, args?: any, context?: any, info?: any) => {
          const storedUser = users.find(_user => _user.id === args.userId);
          if (storedUser) {
            setTimeout(() => {
              pubSub.publish(subscriptionEvents.onUserUpdated, {
                onUserUpdated: storedUser,
              });
            }, 100);
          }

          console.log('subscribed', context.sessionId);

          return pubSub.asyncIterator([subscriptionEvents.onUserUpdated]);
        },
        (payload, variables) => {
          const isClientSubscribedToTheUserUpdate = payload.onUserUpdated.id === variables.userId;
          return isClientSubscribedToTheUserUpdate;
        },
      ),
      resolve: (payload, args, context, info) => {
        console.log('resolve', context.sessionId);
        return payload.onUserUpdated;
      },
    },
  }
};

export { apolloResolvers };
