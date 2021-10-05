import { gql } from '@apollo/client'
import conferenceFragments from 'features/conference/components/gql/queries/fragment'
import commonFragments from 'features/common/fragments'

export const UPDATE_CONFERENCE = gql`
mutation saveConference($input: ConferenceInput!){
    saveConference(input: $input)
    {
    ...conference
    location {
        ...location
        country {
            ...country
        }
        county {
            ...county
        }
        city {
            ...city
        }
    }
    type {
        ...type
    }
    category {
        ...category
    }
    speakers {
        ...speaker
    }
    }   
}

${conferenceFragments.conference}
${conferenceFragments.speaker}
${conferenceFragments.location}
${commonFragments.city}
${commonFragments.county}
${commonFragments.country}
${commonFragments.type}
${commonFragments.category}
`

