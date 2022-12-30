import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Card } from '@totalsoft_oss/rocket-ui.core'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import BookContent from './BookContent'

const BookItem = props => {
  const { book, onEdit, onDelete } = props
  const { t } = useTranslation()

  return (
    <Card title='Book Detail' icon={MenuBookIcon} iconColor='theme'>
      <BookContent book={book} onEdit={onEdit} onDelete={onDelete} />
    </Card>
  )
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BookItem
