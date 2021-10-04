import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
import qr from 'assets/img/qrCode.png'
import ConferenceItem from './ConferenceItem'
import { isEmpty } from 'lodash'


const ConferenceCodeModal = ({ code, suggestedConferences, onAttend }) => {
    const { t } = useTranslation()

    return (
        <>
            <Grid container>
                <Grid item lg={12}>
                    <img src={qr} alt="QR" style={{ maxWidth: '20' }} />
                </Grid>
                <Grid item lg={12}>
                    <Typography variant='subtitle1'>{t("Conferences.QRCodeMessage", { code })}</Typography>
                </Grid>
            </Grid>
            {!isEmpty(suggestedConferences) && (
                <Grid container>
                    <Grid item >
                        <Typography>{t('General.SuggestedConferences')}</Typography>
                    </Grid>
                    {suggestedConferences.map(conference => (
                        <Grid item key={conference?.id}>
                            <ConferenceItem conference={conference} onAttend={onAttend} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    )
}

ConferenceCodeModal.propTypes = {
    code: PropTypes.string,
    suggestedConferences: PropTypes.array,
    onAttend: PropTypes.func
}

export default ConferenceCodeModal