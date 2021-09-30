import React, { useCallback, useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import ConferenceFilter from './ConferenceFilter';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text';
import ConferenceList from './ConferenceList';
import { extractPager, generateDefaultFilters } from 'utils/functions';
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import { CONFERENCE_LIST_QUERY } from './gql/queries/ConferenceListQuery';
import { useEmail } from 'hooks/useEmail';
import { useFooter } from 'providers/AreasProvider';
import Pagination from '@bit/totalsoft_oss.react-mui.pagination';


function ConferenceListContainer() {
    const [filters, setFilters] = useState(generateDefaultFilters)
    const [pager, setPager] = useState({ totalCount: 25, page: 0, pageSize: 3 })

    const [email] = useEmail()
    const [, setFooter] = useFooter()
    useEffect(() => () => setFooter(null), [])    // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager((state) => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handlePageChange = useCallback((page) => {
        setPager((state) => ({ ...state, page }))
    }, [])

    

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY, {
        variables: { 
            pager: extractPager(pager),
             filters, 
             email }, 
        onCompleted:(result)=>{
            const totalCount = result?.conferenceList?.pagination?.totalCount
            setPager(state=>({...state, totalCount}))
        }
    })

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

    return (<>
        <Grid container>
            <Grid item xs={12}>
                <ConferenceFilter filters={filters} onApplyFilters={handleApplyFilters}></ConferenceFilter>
            </Grid>
            <Grid>
                <ConferenceList conferences={data?.conferenceList?.values}>
                </ConferenceList>
            </Grid>
        </Grid>
    </>
    )
}

export default ConferenceListContainer
