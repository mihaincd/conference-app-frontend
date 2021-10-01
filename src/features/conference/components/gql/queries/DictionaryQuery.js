import {gql} from '@apollo/client'
import commonFragments from 'features/common/fragments'


export const DICTIONARY_QUERY = gql`
query getDictionaries{
    
    typeList {
    ...type
    }
  
    categoryList {
    id
    name
    }
  
    countyList {
      ...county
    }

    countryList {
      ...country
    }

    cityList {
      ...city
    }
  }
  ${commonFragments.type}
  ${commonFragments.county}
  ${commonFragments.country}
  ${commonFragments.city}
`
