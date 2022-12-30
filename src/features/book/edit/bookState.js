// import {emptyString, emptyArray, emptyObject} from 'utils/constants'
// import {remove} from 'ramda'

import { emptyString } from 'utils/constants'

export const initialBook = {
  id: null,
  bookName: emptyString,
  authorName: emptyString,
  stock: null,
  category: null
}

export const reducer = (state, action) => {
  // console.log('switch - state ', state)
  // console.log('switch - action ', action)
  switch (action.type) {
    case 'resetData':
      return { ...action.payload }
    case 'addBook':
      return { ...state }
    case 'deleteBook':
      return { ...state }
    case 'bookName':
    case 'authorName':
    case 'stock':
    case 'category':
      return { ...state, [action.type]: action.payload }
    default:
      return state
  }
}
