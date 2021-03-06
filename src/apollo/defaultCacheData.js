import { emptyObject } from 'utils/constants'
import { yourEntityPager, yourEntityListFilter, emailKey } from './cacheKeyFunctions'

// Here you define the default values for local apollo state (@client only values)
// https://www.apollographql.com/docs/react/local-state/local-state-management/

const yourEntityDefaultPager = {
  afterId: null,
  totalCount: 0,
  pageSize: 10,
  sortBy: 'FieldName',
  direction: 1,
  page: 0
}
const yourEntityDefaultListFilter = emptyObject

//valoarea default a Emailului 
const defaultEmail = { email: "admin@totalsoft.ro" }

export const defaults = {
  [emailKey]: defaultEmail,
  [yourEntityPager]: yourEntityDefaultPager,
  [yourEntityListFilter]: yourEntityDefaultListFilter
}
