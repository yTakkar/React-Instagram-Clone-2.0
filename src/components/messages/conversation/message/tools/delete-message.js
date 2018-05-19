import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import Prompt from '../../../../others/prompt'
import Overlay from '../../../../others/overlay'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteMessage } from '../../../../../utils/message-utils'
import MaterialIcon from '../../../../others/icons/material-icon'

@connect()
export default class DeleteMessage extends Component {

  state = {
    deleteMessage: false
  }

  toggleDelete = () =>
    this.setState({ deleteMessage: !this.state.deleteMessage })

  delete = async e => {
    e.preventDefault()
    let {
      messageDetails: { message_id, message, type },
      dispatch
    } = this.props
    deleteMessage({
      message_id, message, type, dispatch,
      done: () => this.toggleDelete()
    })
  }

  render() {
    let { deleteMessage } = this.state

    return (
      <Fragment>
        <span
          data-tip={`Delete ${isAdmin() ? 'as admin' : ''}`}
          onClick={this.toggleDelete}
        >
          <MaterialIcon icon='delete' />
        </span>

        {
          deleteMessage ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Delete message'
                content="This message will be deleted. There's no undo so you won't be able to find it."
                actionText='Delete'
                action={this.delete}
                back={this.toggleDelete}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

DeleteMessage.propTypes = {
  messageDetails: PropTypes.shape({
    message_id: PropTypes.number.isRequired,
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired
}
