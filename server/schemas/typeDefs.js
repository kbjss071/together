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
        addPost(title: String!, content: String!): Post
        addComment(postId: ID!, content: String!): Comment
        addDonation(postId: ID!, amount: Float!): Donation
        updatePost(_id: ID!, title: String!, content: String!): Post
        updateComment(_id: ID!, content: String!): Comment
    }
`

module.exports = typeDefs