import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import EditMessage from '../edit'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../../others/icons/material-icon'

export default class EditMessageTool extends Component {
  state = {
    editMessage: false,
  }

  toggleEdit = () => this.setState({ editMessage: !this.state.editMessage })

  render() {
    let {
      messageDetails: { message_id, type, message },
      updateMessage,
    } = this.props
    let { editMessage } = this.state

    return (
      <Fragment>
        {type == 'text' && (
          <span
            className="toggle_edit_mssg"
            data-tip={`Edit ${isAdmin() ? 'as admin' : ''}`}
            onClick={this.toggleEdit}
          >
            <MaterialIcon icon="mode_edit" />
          </span>
        )}

        {editMessage && (
          <EditMessage
            back={this.toggleEdit}
            message={message}
            message_id={message_id}
            changeMessage={message => updateMessage(message)}
          />
        )}
      </Fragment>
    )
  }
}

EditMessageTool.propTypes = {
  messageDetails: PropTypes.shape({
    message_id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  updateMessage: PropTypes.func.isRequired,
}
