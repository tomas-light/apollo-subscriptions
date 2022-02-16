import { gql, useMutation, useSubscription, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

const SimpleSubscribedUsers = () => {
  const { data: subscribedData } = useSubscription(gql`
      subscription OnUserUpdatedSubscription($userId: Int!) {
          onUserUpdated(userId: $userId) {
              id
              name
          }
      }
  `, {
    variables: { userId: 1 },
  });

  const [updateUser] = useMutation(gql`
      mutation UpdateUser($user: UserUpdateInput!) {
          updateUser(user: $user) {
              id
              name
          }
      }
  `);

  const firstUser = subscribedData?.onUserUpdated;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
      <p>
        Simple Subscribed Users.
      </p>

      {firstUser && (
        <div>
          <input
            id="user-name"
            value={firstUser.name}
            onChange={(event) => {
              updateUser({
                variables: {
                  user: {
                    id: firstUser.id,
                    name: event.target.value,
                  },
                }
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

const ApolloSubscribedUsers = () => {
  const [user, setUser] = useState<{ id: number, name: string } | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const result = client.subscribe<{ onUserUpdated: { id: number, name: string } }>({
      query: gql`
          subscription OnUserUpdatedSubscription($userId: Int!) {
              onUserUpdated(userId: $userId) {
                  id
                  name
              }
          }
      `,
      variables: { userId: 2 },
      fetchPolicy: 'no-cache',
    });
    console.log('subscribed');

    result.subscribe(
      (value) => {
        console.log('next', value.data.onUserUpdated.name);
        setUser(value.data.onUserUpdated);
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        console.log('complete');
      },
    );
  }, []);

  const [updateUser] = useMutation(gql`
      mutation UpdateUser($user: UserUpdateInput!) {
          updateUser(user: $user) {
              id
              name
          }
      }
  `);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
      <p>
        Apollo Subscribed Users.
      </p>

      {user && (
        <div>
          <input
            id="user-name"
            value={user.name}
            onChange={(event) => {
              updateUser({
                variables: {
                  user: {
                    id: user.id,
                    name: event.target.value,
                  },
                }
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export { SimpleSubscribedUsers, ApolloSubscribedUsers };
