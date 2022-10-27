import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!){
        addUser(username: $username, password: $password){
            token
            user {
                _id
                username
            } 
        }
    }
`

export const ADD_POST = gql`
    mutation addPost($title: String!, $content: String!){
        addPost(title: $title, content: $content) {
            _id
            title
        }
    }
`

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $content: String!){
        addComment(postId: $postId, content: $content){
            _id
            content
        }
    }
`

export const ADD_DONATION = gql`
    mutation addDonation($postId: ID!, $amount: Float!){
        addDonation(postId: $postId, amount: $amount){
            _id
            amount
        }
    }
`

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $title: String!, $content: String){
        updatePost(_id: $postId, title: $title, content: $content){
            _id
            title
            content
        }
    }
`

export const UPDATE_COMMENT = gql`
    mutation updateComment($commentId: ID!, $content: String!){
        updateComment(_id: $commentId, content: $content){
            _id
            content
        }
    }
`