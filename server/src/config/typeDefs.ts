import { gql } from 'apollo-server-express';

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    type User {
        id: Int
        name: String
    }
    type Query {
        users: [User]
        user(id: Int!): User
    }


    input UserUpdateInput {
        id: Int
        name: String
    }
    type Mutation {
        updateUser(user: UserUpdateInput!): User!
    }


    type Subscription {
        onUserUpdated(userId: Int!): User!
    }
`;

export { typeDefs };
