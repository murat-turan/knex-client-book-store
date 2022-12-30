import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { Typography } from '@totalsoft_oss/rocket-ui.core'

const BookSubtitle = props => {
  const { t } = useTranslation()
  const { book } = props

  const sxText = {
    color: 'primary',
    bgcolor: 'cyan',
    display: 'inline',
    p: 1,
    borderRadius: 1,
    boxShadow: 2,
    fontWeight: 'bold',
    mx: 0.5,
    fontSize: 16
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Typography sx={sxText} color='text.secondary'>
          Book Id: {book.id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={sxText} color='text.secondary' gutterBottom>
          Book Name: {book.bookName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={sxText} component='div'>
          Author Name: {book.authorName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body2' color={'textPrimary'}>
          Stock: {book.stock} {book.stock <= 100 ? <span style={{ color: 'red' }}>(Critical Stock)</span> : ''}
        </Typography>
      </Grid>
    </Grid>
  )
}

BookSubtitle.propTypes = {
  book: PropTypes.object.isRequired
}

export default BookSubtitle
