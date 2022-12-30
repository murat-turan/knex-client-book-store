import { gql } from '@apollo/client'

const Fragments = {
  book: gql`
    fragment book on Book {
      id
      bookName
      authorName
      stock
    }
  `
}

export default Fragments
