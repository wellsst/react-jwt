import React, {Component} from 'react'

class RequestListItem extends Component {

    render() {
        const {requestId, dateCreated, user} = this.props.item;

        return <li className="list-group-item">{requestId} - {dateCreated} - {user.username}</li>
    }
}

export default RequestListItem;
