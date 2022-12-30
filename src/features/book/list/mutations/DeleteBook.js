import { gql } from '@apollo/client'

export const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`
