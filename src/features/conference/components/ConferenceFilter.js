import DateTime from '@bit/totalsoft_oss.react-mui.date-time';
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { Button, Grid } from '@material-ui/core'
import { Search } from '@material-ui/icons';
import PropTypes from 'prop-types'


import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { generateDefaultFilters } from 'utils/functions';

function ConferenceFilter(props) {
    const { filters, onApplyFilters } = props
    const [startDate, setStartDate] = useState(filters.startDate)
    const [endDate, setEndDate] = useState(filters.endDate)

    useEffect(() => {
        setStartDate(filters.startDate)
        setEndDate(filters.endDate)
    }, [filters])
    const handleApplyButton = useCallback(() => onApplyFilters({ startDate, endDate }), [onApplyFilters, endDate, startDate])
    const handleResetButton = useCallback(() => onApplyFilters(generateDefaultFilters()), [onApplyFilters])
    const handleKeyPressed = useCallback(({ keyCode }) => (keyCode === 13 && handleApplyButton()), [handleApplyButton])

    const { t } = useTranslation()


    return (
        <>
            <IconCard
                icon={Search}
                iconColor="green"
                title=""
                content={
                    <Grid container direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start">
                        <Grid item xs="5">
                            <DateTime
                                value={startDate}
                                onChange={setStartDate}
                                label={t("Conferences.Filters.DateStart")}
                                clearable
                            />
                        </Grid>
                        <Grid item xs="5" space>
                            <DateTime
                                value={endDate}
                                onChange={setEndDate}
                                label={t("Conferences.Filters.DateEnd")}
                                clearable
                            />
                        </Grid>
                    </Grid>
                }
            />
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <Button size={"sm"} color={"primary"} right={true} onClick={handleResetButton}>
                    {t("Conferences.Filters.ResetButtons")}
                </Button>
                <Button size={"sm"} color={"primary"} right={true} onClick={handleApplyButton}>
                    {t("Conferences.Filters.ApplyFilters")}
                </Button>
            </Grid>
        </>
    )
}

ConferenceFilter.propTypes = { filters: PropTypes.object, onApplyFilters: PropTypes.func }

export default ConferenceFilter