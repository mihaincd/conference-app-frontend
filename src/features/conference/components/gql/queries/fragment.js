import { gql } from '@apollo/client'

const Fragment = {conference: gql`
fragment conference on Conference{
    id
    name
    startDate
    endDate
}
`}

export default Fragment