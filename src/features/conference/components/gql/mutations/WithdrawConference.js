import { gql } from '@apollo/client'


const WITHDRAW_CONFERENCE = gql`
    mutation withdraw($input: Attendee!) {
        withdraw(input: $input) {
        id
    }
}
`

export default WITHDRAW_CONFERENCE