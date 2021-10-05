import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card'
import PropTypes from 'prop-types'
import React from 'react'
import ConferenceContent from './ConferenceContent'
import ConferenceSubtitle from './ConferenceSubtitle'

const ConferenceItem = (props) => {
    const { conference, onAttend, onWithdrawn } = props
    const { name, location, speakers } = conference
    const speaker = speakers.find(item => item.isMainSpeaker)


    return (
        <RegularCard cardTitle={name}

            cardSubtitle={
                <ConferenceSubtitle
                    speaker={speaker}
                    location={location}
                />
            }
            content={
                <ConferenceContent
                    conference={conference}
                    onAttend={onAttend}
                    onWithdrawn={onWithdrawn}
                />
            }
        />
    )
}

ConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func.isRequired,
    onWithdrawn: PropTypes.func.isRequired
}

export default ConferenceItem

