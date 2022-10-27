import { gql } from '@apollo/client'

export const QUERY_USER = gql`
    {
        user {
            _id
            username
            password
            post {
                _id
                title
                content
            }
            donation {
                _id
                amount
            }
            comment {
                _id
                content
            }
        }
    }
`