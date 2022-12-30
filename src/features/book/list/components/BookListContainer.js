import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@apollo/client'
import { Pagination, useToast } from '@totalsoft_oss/rocket-ui.core'
import { useError } from 'hooks/errorHandling'
import { useFooter, useHeader } from 'providers/AreasProvider'
import { emptyObject } from 'utils/constants'
import { BOOK_LIST_QUERY } from '../queries/BookListQuery'
import { DELETE_BOOK_MUTATION } from '../mutations/DeleteBook'
import BookFilters from './BookFilters'
import BookList from './BookList'
import BookHeader from './BookHeader'

const defaultPager = {
  afterId: null,
  totalCount: 0,
  pageSize: 10,
  sortBy: 'FieldName',
  direction: 1,
  page: 0
}

const BookListContainer = () => {
  const { t } = useTranslation()
  const showError = useError()
  const addToast = useToast()
  const history = useHistory()
  const [, setHeader] = useHeader()
  const [, setFooter] = useFooter()
  const [pager, setPager] = useState(defaultPager)
  const [filters, setFilters] = useState(emptyObject)

  const listQueryVariables = {
    variables: {
      pager: {
        page: pager.page,
        pageSize: pager.pageSize,
        afterId: pager.afterId
      },
      filters: {
        ...filters
      }
    }
  }

  //#region Queries
  const { data, loading, error, refetch } = useQuery(BOOK_LIST_QUERY, listQueryVariables)
  //#endregion

  //#region Mutations
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    onCompleted: data => {
      if (!data) {
        return
      }
      addToast(t('Books.SuccessfullyDeleted'), 'success')
      refetch()
    },
    onError: showError
  })
  //#endregion

  //#region Crud Operations
  const handleAdd = useCallback(() => history.push(`/books/new`), [history])

  const handleEdit = useCallback(id => () => history.push(`/books/${id}`), [history])

  const handleDelete = useCallback(id => deleteBook({ variables: { id } }), [deleteBook])
  //#endregion

  //#region Pagination
  const handleChangePage = useCallback(page => setPager(currentPager => ({ ...currentPager, page })), [setPager])

  const handleChangeRowsPerPage = useCallback(pageSize => setPager({ ...defaultPager, pageSize: parseInt(pageSize, 10) }), [setPager])

  useEffect(() => {
    if (data && pager.totalCount !== data?.pagination?.totalCount) {
      setPager(currentPager => ({
        ...currentPager,
        totalCount: data?.bookList?.pagination?.totalCount
      }))
    }
  }, [data, pager.totalCount, setPager])

  useEffect(() => () => setFooter(null), [setFooter])

  // useEffect(() => {
  //   setFooter(
  //     <Pagination
  //       count={pager.totalCount}
  //       pageSize={pager.pageSize}
  //       page={pager.page}
  //       rowsPerPageOptions={[3, 6, 9, 12, 21]}
  //       onRowsPerPageChange={handleChangeRowsPerPage}
  //       onPageChange={handleChangePage}
  //       onRefresh={refetch}
  //     />
  //   )
  // }, [setFooter, refetch, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page])

  const handleApplyFilters = useCallback(
    value => {
      setPager(currentPager => ({ ...currentPager, page: 0 })) // reset pager
      setFilters(value)
    },
    [setFilters, setPager]
  )
  //#endregion

  //#region HeaderAndFooter
  useEffect(
    () => () => {
      setFooter(null)
      setHeader(null)
    },
    [setFooter, setHeader]
  )

  useEffect(() => {
    setHeader(<BookHeader headerText={t('NavBar.Books')} onAdd={handleAdd} />)
  }, [handleAdd, setHeader, t])

  useEffect(() => {
    setFooter(
      <Pagination
        count={pager.totalCount}
        pageSize={pager.pageSize}
        page={pager.page}
        rowsPerPageOptions={[3, 6, 9, 12, 21]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onRefresh={refetch}
      />
    )
  }, [handleChangePage, handleChangeRowsPerPage, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])
  //#endregion

  if (loading) {
    return <p>Loading</p>
  } else {
    console.log('bookList', data?.bookList)
  }

  if (error) {
    addToast(error, 'error', false)
  }

  return (
    <>
      <BookFilters filters={filters} onApplyFilters={handleApplyFilters} />
      <BookList books={data?.bookList?.books} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  )
}

export default BookListContainer
