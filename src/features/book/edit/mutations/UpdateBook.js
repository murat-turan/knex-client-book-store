import BookFragments from 'features/book/fragments'
import CommonFragments from 'features/common/fragments'

const { gql } = require('@apollo/client')

export const UPDATE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      ...book
      category {
        ...category
      }
    }
  }
  ${BookFragments.book}
  ${CommonFragments.category}
`
