import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import MyConferencesHeader from 'features/myConference/list/components/MyConferenceHeader'
import { useHeader } from 'providers/AreasProvider'
import React, { useCallback, useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useRouteMatch } from 'react-router'
import { reducer, initialConference } from '../conferenceState'
import MyConference from './MyConference'
import { useError, useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_QUERY } from 'features/myConference/edit/components/queries/ConferenceQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text/dist/LoadingFakeText'
import { UPDATE_CONFERENCE } from '../mutation/UpdateConference'
import { useMutation } from '@apollo/client'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useEmail } from 'hooks/useEmail'



const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()
    const addToast = useToast()
    const history = useHistory()
    const showError = useError()
    const [email] = useEmail()

    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'

    const { data, loading } = useQueryWithErrorHandling(CONFERENCE_QUERY, {
        variables: {
            id: conferenceId,
            isNew
        },
        onCompleted: result => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
    })

    const [updateConference, { loading: saving }] = useMutation(UPDATE_CONFERENCE, {
        onCompleted: result => {
            addToast(t('MyConference.SavingSucceeded', 'success'))
            if (isNew) {
                history.push(`/myConferences/${result?.saveConference?.id}`)
            }
            result?.saveConference && dispatch({ type: "resetConference", payload: result?.saveConference })
        },
        onError: showError
    })

    const handleSave = useCallback(() => {
        const { id, name, startDate, endDate, deletedSpeaker, type, location, category, speakers } = conference
        const { city, country, county, ...locationData } = location

        const input = {
            id,
            name,
            startDate,
            endDate,
            organizerEmail: email,
            deletedSpeaker,
            type,
            category,
            location: {
                ...locationData,
                cityId: city?.id,
                countryId: country?.id,
                countyId: county?.id
            },
            speakers
        }
        updateConference({ variables: { input } })
    }, [conference, email, updateConference])


    useEffect(() => () => setHeader(null), []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        setHeader(
            <MyConferencesHeader title={conference.name} actions={<SaveButton title={t("General.Button.Save")} onClick={handleSave} />} />)
    }, [conference.name, handleSave, setHeader, t])


    if (loading || saving) return <LoadingFakeText lines={10}></LoadingFakeText>

    return <MyConference
        conference={conference}
        dispatch={dispatch}
        types={data?.typeList}
        categories={data?.categoryList}
        countries={data?.countryList}
        counties={data?.countyList}
        cities={data?.cityList}
    />
}


export default MyConferenceContainer