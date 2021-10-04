import { gql } from '@apollo/client'
import conferenceFragments from 'features/conference/components/gql/queries/fragment'
import commonFragments from 'features/common/fragments'

const ATTEND_CONFERENCE = gql`
    mutation attend($input: Attendee!) {
    attend(input: $input) {
      code
      suggestedConferences {
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

export default ATTEND_CONFERENCE