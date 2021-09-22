import React, { Fragment } from 'react'
import { Typography, Grid, InputAdornment, IconButton } from '@material-ui/core'
// import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

function Welcome() {
  // const addToast = useToast()
  // addToast('This is my toast', 'success')

  const { t } = useTranslation()

  return (
    <Grid container direction="column" alignItems="center" spacing={10} >
      <Grid item  >
        <Typography variant="h5"> {t("Welcome.Title")}</Typography>
      </Grid>
      <Grid container item direction="column" alignItems="center" >
        <Typography variant="caption"> {t("Welcome.Subtitle")}</Typography>
        <Grid item>
          <CustomTextField endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" color="theme" aria-label="go" >
                  <KeyboardReturnIcon fontSize="small"></KeyboardReturnIcon>
              </IconButton>
            </InputAdornment>}>
          </CustomTextField>
        </Grid>
      </Grid>

    </Grid>

  )
}

export default Welcome
