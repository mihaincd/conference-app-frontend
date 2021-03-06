import React, { useCallback, useState } from 'react'
import { Typography, Grid, InputAdornment, IconButton } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { emptyString } from 'utils/constants'
import { useEmail } from 'hooks/useEmail'
import { validateEmail } from 'utils/functions'

function Welcome() {
  const { t } = useTranslation()

  const [email, setEmail] = useEmail()
  const [inputValue, setInputValue] = useState(email)

  const [isValid, setIsValid] = useState(true)

  const handleChangeEmail = useCallback((event) => { setInputValue(event.target.value); }, []);
  const handleButtonClick = useCallback(() => {
    const isEmailValid = validateEmail(inputValue);
    setEmail(isEmailValid ? inputValue : emptyString)
    setIsValid(isEmailValid)
  }, [inputValue, setEmail])

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      handleButtonClick()
    }
  }, [handleButtonClick])

  return (
    <Grid container direction="column" alignItems="center" spacing={10} >
      <Grid item  >
        <Typography variant="h5"> {t("Welcome.Title")}</Typography>
      </Grid>
      <Grid container item direction="column" alignItems="center" style={{ padding: '150px' }}>
        <Typography variant="caption"> {t("Welcome.Subtitle")}</Typography>
        <Grid item>
          <CustomTextField onChange={handleChangeEmail} value={inputValue}
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="small" color="primary" aria-label="go" onClick={handleButtonClick}>
                  <KeyboardReturnIcon fontSize="small"></KeyboardReturnIcon>
                </IconButton>
              </InputAdornment>}
            helperText={!isValid && t("Welcome.BadEmail")}
            error={!isValid}
            onKeyDown={handleKeyDown}>

          </CustomTextField>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Welcome
