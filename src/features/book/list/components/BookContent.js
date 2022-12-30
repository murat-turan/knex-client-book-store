import { Grid } from '@mui/material'
import { Button, CustomDialog, Typography } from '@totalsoft_oss/rocket-ui.core'
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const BookContent = props => {
  const { book, onEdit, onDelete } = props
  const { id, bookName, authorName, stock, category } = book
  const { t } = useTranslation()
  const [warning, showWarning] = useState(false)

  //console.log('category => ', categoryId, categoryName)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleShowDialog = useCallback(() => showWarning(current => !current), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeDialog = useCallback(() => showWarning(false), [])

  const handleDialogYes = useCallback(() => {
    showWarning(false)
    onDelete(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, onDelete])

  const sxText = {
    color: 'primary',
    bgcolor: 'yellow',
    display: 'inline',
    p: 1,
    borderRadius: 1,
    boxShadow: 2,
    fontWeight: 'bold',
    mx: 0.5,
    fontSize: 14
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Typography style={sxText}>Book Id: {book.id}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Book Name : ${bookName}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Author Name: ${authorName}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Category Name: ${category.categoryName}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>{`Stock : ${stock}`}</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button size={'small'} color={'primary'} right={true} onClick={onEdit(id)}>
            {t('General.Buttons.Edit')}
          </Button>
          <Button size={'small'} color={'error'} right={true} onClick={handleShowDialog}>
            {t('General.Buttons.Delete')}
          </Button>
        </Grid>
      </Grid>

      <CustomDialog
        id='showWarning'
        open={warning}
        title={t('General.Warning')}
        content={t('General.DeleteWarning')}
        onYes={handleDialogYes}
        onClose={closeDialog}
        //showActions
      />
    </Grid>
  )
}

BookContent.propTypes = {
  book: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default BookContent
