import { gql } from '@apollo/client'
import Fragments from '../../fragments'
import CommonFragments from '../../../common/fragments'

export const BOOK_LIST_QUERY = gql`
  query bookList($pager: PagerInput!, $filters: BookFilterInput) {
    bookList(pager: $pager, filters: $filters) {
      books {
        ...book
        category {
          ...category
        }
      }
      pagination(pager: $pager, filters: $filters) {
        totalCount
        prevPage {
          ...paginationInfo
        }
        nextPage {
          ...paginationInfo
        }
      }
    }
  }
  ${Fragments.book}
  ${CommonFragments.category}
  ${CommonFragments.paginationInfo}
`
