import React, {Component} from 'react';
import RequestListItem from "./RequestListItem";
import { Query, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

const LIST_QUERY = gql`
query {
  registrationRequestList(max:10) {
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
    state = {
        requestList: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateList();
    }

    render() {
        return (
            <div className="form-group">
                <button type="submit" className="btn btn-primary" onClick={() => this.updateList()}>Update GraphQL list
                </button>
                {
                    this.state.requestList.map(item => <RequestListItem key={item.id} item={item}/>)
                }
            </div>
            /*<Query query={LIST_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const requestList = data.registrationRequestList

                    return (
                        [requestList.map(item => <RequestListItem key={item.id} item={item}/>)]
                    )
                }}
            </Query>*/
        )
    }

    updateList = async () => {
        //const {nrPhrases, nrWords} = this.state
       // this.props.client.resetStore(); // delete the cache, see though fetchPolicy or refetch https://www.apollographql.com/docs/react/api/react-apollo/
        const result = await this.props.client.query({
            query: LIST_QUERY,
            fetchPolicy: "network-only"
        });
        const requestList = result.data.registrationRequestList;
        this.setState({requestList})
    }
}

export default withApollo(SecureApolloTest)