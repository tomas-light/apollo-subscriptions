import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';

const ApolloSubscribedUsers = () => {

  const { data: userData } = useQuery(gql`
      query GetUsers {
          users {
              id
              name
          }
      }
  `);

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

  let firstUser: { id: number, name: string } | null;
  if (subscribedData) {
    firstUser = subscribedData.onUserUpdated;
  } else if (userData) {
    firstUser = userData.users[0];
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
      <p>
        Apollo Subscribed Users.
      </p>

      {firstUser && (
        <div>
          <label htmlFor="user-name">user <b>{firstUser.id}</b>:</label>
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
  )
};

export { ApolloSubscribedUsers };
