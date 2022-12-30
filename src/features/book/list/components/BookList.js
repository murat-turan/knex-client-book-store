import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'
import { Grid } from '@mui/material'

const BookList = props => {
  const { books, onEdit, onDelete } = props
  //console.log('BookList books', books)

  return (
    <Grid container spacing={2}>
      {books?.map(book => (
        <Grid item xs={12} lg={4} key={book.id}>
          <BookItem book={book} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  )
}

BookList.propTypes = {
  books: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BookList
