import {  Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import Button from '@bit/totalsoft_oss.react-mui.button'
import { useTranslation } from 'react-i18next'
import attendeeStatus from 'constants/attendeeStatus'


const ConferenceContent = props => {
    const { conference } = props
    const { status, startDate, endDate, type, category } = conference

    const { t } = useTranslation();

    const noStatusSet = t('Conferences.StatusNotSet')

    const showJoin = status?.id === attendeeStatus.Attended
    const showWithdraw = status?.id === attendeeStatus.Attended || status?.id === attendeeStatus.Joined
    const showAttend = status?.id === attendeeStatus.Withdraw

    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MMM-YYYY HH:mm' } })
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MMM-YYYY HH:mm' } })
    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography variant='subtitle1' color='error'>
                    {(status?.name) || noStatusSet}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${startDateFormatted}-${endDateFormatted}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>{`${type.name}, ${category.name}`}</Typography>
            </Grid>

            <Grid container spacing='2' >
                <Grid item xs={12}>
                    {showJoin && <Button right color="success" size={"sm"}>{t('Conferences.Components.Join')}</Button>}
                    {showWithdraw && <Button right size={"sm"} color="danger" >{t("Conferences.Components.Withdraw")}</Button>}
                    {showAttend && <Button right size='sm' color="info" >{t("Conferences.Components.Attended")}</Button>}
                </Grid>
            </Grid>
        </Grid>
    )
}

ConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired,
}

export default ConferenceContent;

