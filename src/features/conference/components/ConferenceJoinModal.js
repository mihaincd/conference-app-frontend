import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Typography from '@bit/totalsoft_oss.react-mui.typography'
// import qr from 'assets/img/qrCode.png'
import ConferenceItem from './ConferenceItem'
import { isEmpty } from 'lodash'


const ConferenceJoinModal = ({ startDate,endDate, onJoin  }) => {
    const { t } = useTranslation()
    const today = new Date()

    return (
        <>
            <Grid container>
                
                {/* <Grid item lg={12}>
                    <Typography variant='subtitle1'>{t("Conferences.QRCodeMessage", { code })}</Typography>
                </Grid> */}
            </Grid>
            {/* {!isEmpty() && (
                <Grid container>
                    <Grid item >
                        <Typography>{t('General.SuggestedConferences')}</Typography>
                    </Grid>
                    {.map(conference => (
                        <Grid item key={conference?.id}>
                            <ConferenceItem conference={conference} onAttend={onAttend} />
                        </Grid>
                    ))}
                </Grid>
            )} */}
            
        </>
    )
}

ConferenceJoinModal.propTypes = {
    startDate: PropTypes.Date,
    endDate: PropTypes.Date,
    onJoin: PropTypes.func
}

export default ConferenceJoinModal