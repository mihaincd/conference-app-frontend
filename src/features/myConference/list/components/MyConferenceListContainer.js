import React, { useCallback, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import MyConferenceFilter from './MyConferenceFilter';
import conferences from 'utils/mocks/attendeeList';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text';
import MyConferenceList from './MyConferenceList';
import { extractPager, generateDefaultFilters } from 'utils/functions';
import { useFooter, useHeader } from 'providers/AreasProvider';
import MyConferencesHeader from './MyConferenceHeader';
import { useTranslation } from 'react-i18next';
import AddButton from '@bit/totalsoft_oss.react-mui.add-button';
import { useHistory } from 'react-router';
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import { CONFERENCE_LIST_QUERY } from 'features/conference/components/gql/queries/ConferenceListQuery';
import { useEmail } from 'hooks/useEmail';
import Pagination from '@bit/totalsoft_oss.react-mui.pagination';


function MyConferenceListContainer() {
    const { t } = useTranslation()

    const [filters, setFilters] = useState(generateDefaultFilters)
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })

    const [, setHeader] = useHeader()
    const [, setFooter] = useFooter()
    const history = useHistory()
    const [email] = useEmail()

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: extractPager(pager),
            filters: {
                ...filters,
                organizerEmail: email
            },
            email
        },
        onCompleted: (result) => {
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state => ({ ...state, totalCount }))
        }
    })

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handlePageChange = useCallback((page) => {
        setPager((state) => ({ ...state, page }))
    }, [])

    const handleAddClick = useCallback(() => {
        history.push('myConferences/new')

    }, [history])

    useEffect(() => {
        //did mount
        return () => {
            //will unmount
            setHeader(null)
            setFooter(null)
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setHeader(
            <MyConferencesHeader
                title={t('NavBar.MyConferences')}
                actions={<AddButton title={t('General.Button.AddConference')} onClick={handleAddClick} />}
            />)
        return () => {
        }
    }, [])
    useEffect(() => {
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3, 6, 12, 24, 100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            onRefresh={refetch}
        />)
    }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    if (loading || !data) return <LoadingFakeText lines={10} />

    return (
        <Grid container>
            <Grid item xs={12}>
                <MyConferenceFilter filters={filters} onApplyFilters={handleApplyFilters}></MyConferenceFilter>
                <MyConferenceList conferences={data?.conferenceList?.values}></MyConferenceList>
            </Grid>
        </Grid>

    )
}

export default MyConferenceListContainer
