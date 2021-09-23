import { Grid } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import React from 'react'
import ConferenceItem from './ConferenceItem'



const ConferenceList = (props) =>{
    const { conferences} = props
        
    return <Grid container spacing={2}>
        {conferences.map(conference=>(<Grid item xs={12} lg={4} key={conference.id}>
            <ConferenceItem conference ={conference} />
            </Grid>
        ))}
    </Grid>
}

ConferenceList.propTypes = {
    conferences: PropTypes.array.map
}

export default ConferenceList