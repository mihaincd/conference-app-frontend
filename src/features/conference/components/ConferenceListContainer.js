import React, { useCallback, useState } from 'react'
import { Grid } from '@material-ui/core'
import ConferenceFilter from './ConferenceFilter';
import conferences from 'utils/mocks/attendeeList';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text';
import ConferenceList from './ConferenceList';
import { generateDefaultFilters } from 'utils/functions';


function ConferenceListContainer(){
    const { data, loading } = { data: conferences, loading: false }
    const [filters, setFilters] = useState(generateDefaultFilters)

    const handleApplyFilters = useCallback((value) =>{
        setFilters(value)
    },[])

    if (loading) return <LoadingFakeText lines={10} />

    return (<>
        <Grid container>
            <Grid item xs={12}>
                <ConferenceFilter filters={filters} onApplyFilters={handleApplyFilters}></ConferenceFilter>
            </Grid>
            <Grid>
                <ConferenceList conferences={data}>
                </ConferenceList>
            </Grid>
        </Grid>
    </>
    )
}

export default ConferenceListContainer
