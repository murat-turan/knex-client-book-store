import { Button, Card, TextField } from '@totalsoft_oss/rocket-ui.core'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { emptyObject } from 'utils/constants'
import { curry } from 'ramda'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
//import { TextField } from '@mui/material'

const BookFilters = ({ filters, onApplyFilters }) => {
  const { t } = useTranslation()
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterPropertyChange = curry((prop, value) => setLocalFilters(prevFilters => ({ ...prevFilters, [prop]: value })))
  const handleApplyFilters = useCallback(() => onApplyFilters(localFilters), [localFilters, onApplyFilters])
  const handleResetFilters = useCallback(() => setLocalFilters(emptyObject), [])
  //const keyPressed = useCallback(({ keyCode }) => keyCode === 13 && handleApplyFilters(), [handleApplyFilters])

  return (
    <Card
      icon={SearchIcon}
      iconColor={'theme'}
      //title={'Book Filter'}
      subheader={
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} lg={4}>
            <TextField
              fullWidth
              label='Book Name'
              type='search'
              value={localFilters?.bookName}
              onChange={handleFilterPropertyChange('bookName')}
              clearable='true'
            />
          </Grid>
          <Grid item xs={12} sm={9} lg={4}>
            <TextField
              label='Author Name'
              type='search'
              fullWidth
              value={localFilters?.authorName}
              onChange={handleFilterPropertyChange('authorName')}
              clearable='true'
            />
          </Grid>
        </Grid>
      }
      footer={
        <>
          <Button size={'small'} color={'primary'} onClick={handleResetFilters}>
            {t('General.Buttons.ResetFilters')}
          </Button>
          <Button size={'small'} color={'secondary'} onClick={handleApplyFilters}>
            {t('General.Buttons.ApplyFilters')}
          </Button>
        </>
      }
    />
  )
}

BookFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onApplyFilters: PropTypes.func.isRequired
}

export default BookFilters
