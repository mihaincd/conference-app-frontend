import { gql } from '@apollo/client'
import conferenceFragments from 'features/conference/components/gql/queries/fragment'
import commonFragments from 'features/common/fragments'

export const CONFERENCE_QUERY = gql`
query conferenceById($id: ID!, $isNew:Boolean!) {
  conference(id: $id) @skip(if: $isNew){
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
  typeList {
    ...type
  }
  categoryList {
    ...category
  }
  cityList {
    ...city
  }
  countyList {
    ...county
  }
  countryList {
    ...country
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