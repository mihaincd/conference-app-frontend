import { Grid } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import React from 'react'
import ConferenceItem from './ConferenceItem'



const ConferenceList = (props) => {
    const { conferences, onAttend, onWithdrawn, onJoined } = props

    return <Grid container spacing={2}>
        {conferences.map(conference => (<Grid item xs={12} lg={4} key={conference.id}>
            <ConferenceItem conference={conference} onAttend={onAttend} onWithdrawn={onWithdrawn} onJoined={onJoined} />
        </Grid>
        ))}
    </Grid>
}

ConferenceList.propTypes = {
    conferences: PropTypes.array.isRequired,
    onAttend: PropTypes.func.isRequired,
    onWithdrawn: PropTypes.func.isRequired,
    onJoined: PropTypes.func.isRequired
}

export default ConferenceList