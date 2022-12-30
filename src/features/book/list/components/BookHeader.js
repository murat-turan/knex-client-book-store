import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { emptyString } from 'utils/constants'
import { Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
//import { makeStyles } from '@mui/styles'
import { IconButton, Typography } from '@totalsoft_oss/rocket-ui.core'

//const useStyles = makeStyles(theme => ({title: { ...theme.header.title, width: '100%' } }))

const BookHeader = ({ headerText, onAdd }) => {
  const { t } = useTranslation()
  //const classes = useStyles()

  return (
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item xs={6} sm={9} lg={9} container justifyContent='flex-start'>
        <Typography variant='subtitle1'>{headerText || emptyString}</Typography>
      </Grid>
      <Grid item xs={6} sm={3} lg={3} container justifyContent='flex-end'>
        <IconButton key='addButton' title={t('General.Buttons.AddBook')} onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

BookHeader.propTypes = {
  headerText: PropTypes.string,
  onAdd: PropTypes.func.isRequired
}

export default BookHeader
