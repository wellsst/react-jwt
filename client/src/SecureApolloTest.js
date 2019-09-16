import React, {Component} from 'react';
import RequestListItem from "./RequestListItem";
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const LIST_QUERY = gql`
query {
  registrationRequestList {
    id
    challengeId
    requestId
    requestRemoteAddr
    dateCreated
    user {
      id
      username
      loginToken
    }
    requestId
  }

}
`;

class SecureApolloTest extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Query query={LIST_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const requestList = data.registrationRequestList

                    return (
                        [requestList.map(item => <RequestListItem key={item.id} item={item}/>)]
                    )
                }}
            </Query>
        )
    }
}

export default withApollo(SecureApolloTest)