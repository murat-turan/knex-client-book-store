import { gql } from '@apollo/client'

const CommonFragments = {
  paginationInfo: gql`
    fragment paginationInfo on Page {
      page
      pageSize
    }
  `,
  category: gql`
    fragment category on Category {
      id
      categoryName
    }
  `
}

export default CommonFragments
