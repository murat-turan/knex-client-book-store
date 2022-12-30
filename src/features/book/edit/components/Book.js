import React from 'react'
import PropTypes from 'prop-types'
import { BackToButton, Card } from '@totalsoft_oss/rocket-ui.core'
import InfoIcon from '@mui/icons-material/Info'
import { useTranslation } from 'react-i18next'
import BookInfo from './BookInfo'

const Book = ({ book, dispatch, categories }) => {
  const { t } = useTranslation()

  return (
    <>
      <Card
        icon={InfoIcon}
        title={t('NavBar.Books')}
        subheader={<BookInfo book={book} dispatch={dispatch} categories={categories} />}
        actions={'Action'}
        footer={<BackToButton path='/books' />}
      >
        Child
      </Card>
    </>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default Book
