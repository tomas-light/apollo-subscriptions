type User = {
  id: number;
  name: string;
};

const users: User[] = [
  {
    id: 1,
    name: 'Name 1',
  },
  {
    id: 2,
    name: 'Name 2',
  },
  {
    id: 3,
    name: 'Name 3',
  },
];

export type { User };
export { users };
