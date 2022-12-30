import { useMutation, useQuery } from '@apollo/client'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'

import { BOOK_QUERY } from '../queries/BookQuery'
import { UPDATE_BOOK } from '../mutations/UpdateBook'

import { useError } from 'hooks/errorHandling'
import { useToast } from '@totalsoft_oss/rocket-ui.core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useHeader } from 'providers/AreasProvider'
import { reducer, initialBook } from '../bookState'
import Book from './Book'
import BookHeader from './BookHeader'

const BookContainer = () => {
  const { t } = useTranslation()
  const showError = useError()
  const addToast = useToast()
  const history = useHistory()
  const [, setHeader] = useHeader()
  const [localBook, dispatch] = useReducer(reducer, initialBook)
  const match = useRouteMatch()
  const bookId = match.params.id
  const isNew = bookId === 'new'

  const { loading, error, data } = useQuery(BOOK_QUERY, {
    variables: { id: bookId, isNew },
    onCompleted: data => data?.book && dispatch({ type: 'resetData', payload: data?.book }),
    onError: showError
  })

  const [updateBook, { loading: saving }] = useMutation(UPDATE_BOOK, {
    onCompleted: result => {
      addToast(t('Books.SaveSucceeded'), 'success')

      if (isNew) {
        history.push(`/books/${result?.saveBook?.id}`)
        return
      }

      result?.saveBook && dispatch({ type: 'resetData', payload: result?.saveBook })
    },
    onError: showError
  })

  useEffect(() => () => setHeader(null), [setHeader])

  const handleSave = useCallback(() => {
    const { id, bookName, authorName, stock, category } = localBook
    //console.log('localBook =>', localBook)
    const input = {
      id,
      bookName,
      authorName,
      stock,
      category
    }
    updateBook({ variables: { input } })
  }, [localBook, updateBook])

  useEffect(() => {
    //console.log('useEffect => handleSave')
    setHeader(<BookHeader headerText={localBook.bookName} onSave={handleSave} saving={saving} />)
  }, [handleSave, localBook.bookName, saving, setHeader])

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    addToast(error, 'error', false)
  }

  return <Book book={localBook} dispatch={dispatch} categories={data?.categoryList} />
}

export default BookContainer
