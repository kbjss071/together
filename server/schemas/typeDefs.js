const {gql} = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        password: String
        post: [Post]
        donation: [Donation]
        comment: [Comment]
    }
    
    type Post {
        _id: ID!
        title: String
        content: String
        user: User
    }

    type Donation {
        _id: ID!
        user: User
        post: Post
        amount: Float
    }

    type Comment {
        _id: ID!
        post: Post
        content: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
        posts: [Post]
        comments: [Comment]
        donations: [Donation]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, password: String!): Auth
        addPost(username: String!): Post
        addComment(username: String!, post: ID!): Comment
        addDonation(username: String!, post: ID!): Donation
        updatePost(_id: ID!, post: ID!): Post
        updateComment(_id: ID!, comment: ID!): Comment
    }
`

module.exports = typeDefs