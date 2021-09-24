import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { Face, Info, LocationOn } from '@material-ui/icons'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import AddButton from '@bit/totalsoft_oss.react-mui.add-button'

import MyConferenceLocation from './MyConferenceLocation'
import MyConferenceSpeakers from './MyConferenceSpeakers'
import MyConferenceInfo from './MyConferenceInfo'


const MyConference = (props) => {
    const { types, categories, countries, counties, cities } = props
    const { t } = useTranslation()

    return <>
        <IconCard icon={Info} title={t('Conference.Info')} content={<MyConferenceInfo types={types} categories={categories} />} />
        <IconCard icon={LocationOn} title={t('Conference.Location')} content={<MyConferenceLocation countries={countries} categories={categories} />} />
        <IconCard icon={Face} title={<CardTitle
            title={t("Conference.Speakers")}
            actions={[<AddButton key='addButton' title={t("General.Button.AddSpeaker")} />]}
        />} content={<MyConferenceSpeakers />}

        />

    </>

}

MyConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array
}

export default MyConference