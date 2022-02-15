import { useState } from 'react';

const RestUsers = () => {
  const [users, setUsers] = useState<{ id: number, name: string }[]>([]);

  const loadUsers = async () => {
    const response = await fetch('http://localhost:5000/api/user');
    if (response.ok) {
      const _users = await response.json();
      setUsers(_users);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12, }}>
      <p>
        Rest Users.
      </p>

      <button onClick={loadUsers}>load users (rest api)</button>

      <ul style={{ display: 'flex', flexDirection: 'column', rowGap: 4, }}>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
};

export { RestUsers };
