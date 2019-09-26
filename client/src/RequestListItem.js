import React, {Component} from 'react'

class RequestListItem extends Component {

    render() {
        const {requestId, dateCreated, user} = this.props.item;

        return <li class="list-group-item list-group-item-light">{requestId} - {dateCreated} - {user.username}</li>
    }
}

export default RequestListItem;
