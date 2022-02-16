import { gql, NetworkStatus, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const ApolloUsers = () => {
  const [users, setUsers] = useState<{ id: number, name: string }[]>([]);

  const [getUsers] = useLazyQuery(gql`
      query GetUsers {
          users {
              id
              name
          }
      }
  `);

  const loadUsers = async () => {
    const queryResult = await getUsers();

    if (queryResult.networkStatus === NetworkStatus.ready) {
      const _users = await queryResult.data.users;
      setUsers(_users);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
      <p>
        Apollo Users.
      </p>

      <button onClick={loadUsers}>load users (gql api)</button>

      <ul style={{ display: 'flex', flexDirection: 'column', rowGap: 4, }}>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
};

export { ApolloUsers };
