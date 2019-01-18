const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    user(id: ID!): User!
    users(
      substr: String
      hometown: String
      house: String
      concentration: String
    ): [User!]
    post(id: ID!): Post!
    posts: [Post!]
  }

  type Mutation {
    createUser(input: CreateUserInput!): LoginReturn!
    createPost(content: String!): CreatePostReturn!
    editPost(id: ID!, newContent: String!): EditPostReturn!
    loginUser(email: String!, password: String!): LoginReturn!
  }

  type CreatePostReturn {
    post: Post
    error: String
  }

  type EditPostReturn {
    post: Post
    error: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    birthday: String
    concentration: String
    hometown: String
    house: String
    gender: String
    bio: String
    picture: String
    hobbies: [HobbyInput!]
  }

  input HobbyInput {
    hobby: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    birthday: String
    concentration: String
    hometown: String
    house: String
    gender: String
    bio: String
    picture: String
  }

  type Post {
    id: ID!
    content: String!
    date: String!
  }

  type LoginReturn {
    user: User
    token: String
    error: String
  }
`
