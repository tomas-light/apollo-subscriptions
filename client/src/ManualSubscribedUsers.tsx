import { gql, useMutation, useSubscription, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

const HookSubscribedUsers = () => {
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

  const user = subscribedData?.onUserUpdated;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
      <p>
        Subscribed with hooks.
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

const ManualSubscribedUsers = () => {
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

    result.subscribe(
      (value) => {
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
        Manual subscribed.
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

export { HookSubscribedUsers, ManualSubscribedUsers };
