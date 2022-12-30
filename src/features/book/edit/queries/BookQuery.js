const { gql } = require('@apollo/client')
import Fragments from 'features/book/fragments'
import CommonFragments from 'features/common/fragments'

export const BOOK_QUERY = gql`
  query bookData($id: ID!, $isNew: Boolean!) {
    book(id: $id) @skip(if: $isNew) {
      ...book
      category {
        ...category
      }
    }
    categoryList {
      ...category
    }
  }
  ${Fragments.book}
  ${CommonFragments.category}
`
