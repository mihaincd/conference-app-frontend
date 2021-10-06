import { gql } from '@apollo/client'


const JOIN_USERS_QUERY = gql`
query joinedUsers($id: ID!) {
    joinedUsers(id: $id) {
        attendeeEmail
  }
}
`

export default JOIN_USERS_QUERY