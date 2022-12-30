import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'
import { Autocomplete, TextField } from '@totalsoft_oss/rocket-ui.core'
import { emptyString } from 'utils/constants'

const BookInfo = ({ dispatch, book, categories }) => {
  const { t } = useTranslation()

  const handleDispatch = actionType => value => dispatch({ type: actionType, payload: value })

  return (
    <Grid container spacing={3}>
      <Grid item container lg={9} spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            label={t('Book.BookName')}
            value={book?.bookName || emptyString}
            onChange={onTextBoxChange(handleDispatch('bookName'))}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid item container lg={12} spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            label={t('Book.AuthorName')}
            value={book?.authorName || emptyString}
            onChange={onTextBoxChange(handleDispatch('authorName'))}
            fullWidth
          />
        </Grid>

        <Grid item container lg={12} spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField isNumeric label={'Stock'} value={book?.stock} onChange={onTextBoxChange(handleDispatch('stock'))} fullWidth />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Autocomplete
            label={t('Book.Category')}
            fullWidth
            value={book?.category}
            valueKey='id'
            labelKey='categoryName'
            key='id'
            options={categories}
            onChange={handleDispatch('category')}
            isClearable
            isSearchable
            creatable
            createdLabel='Book.Category'
            placeholder='Select category'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

BookInfo.propTypes = {
  book: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default BookInfo
