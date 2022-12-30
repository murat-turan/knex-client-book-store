import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
//import { makeStyles } from '@mui/styles'
import { emptyString } from 'utils/constants'
import { IconButton } from '@totalsoft_oss/rocket-ui.core'
import SaveIcon from '@mui/icons-material/Save'
import { useTranslation } from 'react-i18next'

// const useStyles = makeStyles((theme) => ({ title: { ...theme.header.title, width: '100%' } }));

const BookHeader = props => {
  const { headerText, onSave, saving } = props
  const { t } = useTranslation()

  // const classes = useStyles();

  return (
    <Grid container justifyContent='flex-start' alignItems='center'>
      <Grid item xs={6} sm={9} lg={9} container justifyContent='flex-start'>
        <Typography variant='subtitle1'>{headerText || emptyString}</Typography>
      </Grid>

      <Grid item xs={3} sm={3} lg={3} container justifyContent='flex-end' spacing={1}>
        <Grid item>
          <IconButton key='addButton' onClick={onSave} loading={saving} title={saving ? t('General.Saving') : t('General.Buttons.Save')}>
            <SaveIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

BookHeader.propTypes = {
  headerText: PropTypes.string,
  onSave: PropTypes.func,
  saving: PropTypes.bool
}

export default BookHeader
