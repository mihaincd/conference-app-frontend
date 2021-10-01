import { gql } from '@apollo/client'

const Fragment = {
    conference: gql`
fragment conference on Conference{
    id
    name
    startDate
    endDate
}
`,
    location: gql`
fragment location on Location{
    id
    name
    address
    latitude
    longitude 
}
`,
    speaker: gql`
fragment speaker on Speaker{
    id
    name
    nationality
    rating
    isMainSpeaker
}
`,
    city: gql`
fragment city on City{
    id
    name
    code
}
`,
    country: gql`
fragment country on Country{
    id
    name
    code
}
`,
    county: gql`
fragment county on County{
    id
    name
    code
}
`,
    category: gql`
fragment category on Category{
    id
    name
}
`,
    type: gql`
fragment type on Type{
    id
    name
}
`
}

export default Fragment