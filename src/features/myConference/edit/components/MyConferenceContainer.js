import SaveButton from '@bit/totalsoft_oss.react-mui.save-button'
import { Grid } from '@material-ui/core'
import MyConferencesHeader from 'features/myConference/list/components/MyConferenceHeader'
import { useHeader } from 'providers/AreasProvider'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { categories, cities, types } from 'utils/mocks/conferenceDictionaries'
import MyConference from './MyConference'



const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()

    useEffect(() => () => setHeader(null), []) // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setHeader(
            <MyConferencesHeader actions={<SaveButton title={t("General.Button.Save")} />} />)
    }, [setHeader, t])

    const { data, loading } = {
        loading: false,
        data: {
            typeList: types,
            categoryList: categories,
            countryList: categories,
            countyList: categories,
            cityList: cities
        }
    }

    return <MyConference
        types={data?.typeList}
    />
}


export default MyConferenceContainer