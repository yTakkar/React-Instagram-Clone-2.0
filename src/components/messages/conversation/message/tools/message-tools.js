import React, { Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import { Me } from '../../../../../utils/utils'
import PropTypes from 'prop-types'
import ToolTip from 'react-tooltip'
import DeleteMessage from './delete-message'
import EditMessageTool from './edit-message'
import { FadeIn } from 'animate-components'

const MessageTools = ({ messageDetails, updateMessage }) => {
  let { mssg_by } = messageDetails

  return (
    <Fragment>
      {(Me(mssg_by) || isAdmin()) && (
        <FadeIn duration="300ms">
          <DeleteMessage messageDetails={messageDetails} />
          <EditMessageTool
            messageDetails={messageDetails}
            updateMessage={updateMessage}
          />
          <ToolTip />
        </FadeIn>
      )}
    </Fragment>
  )
}

MessageTools.propTypes = {
  messageDetails: PropTypes.shape({
    message_id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    mssg_by: PropTypes.number.isRequired,
  }).isRequired,
  updateMessage: PropTypes.func.isRequired,
}

export default MessageTools
