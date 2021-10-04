import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import qr from 'assets/img/qrCode.png'


const ConferenceCodeModal = ({ code }) => {
    const { t } = useTranslation()

    return (
        <Grid container>
            <Grid item>
                <img src={qr} alt="QR" />
            </Grid>
            <Grid>

                <Typography>{t("Conferences.QRCodeMessage"), code}</Typography>

            </Grid>
        </Grid>
    )
}

ConferenceCodeModal.propTypes = {
    code: PropTypes.object.isRequired
}

export default ConferenceCodeModal