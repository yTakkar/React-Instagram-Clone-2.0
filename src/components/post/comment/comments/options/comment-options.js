import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { Me } from '../../../../../utils/utils'
import PropTypes from 'prop-types'
import EditCommentOption from './edit'
import DeleteCommentOption from './delete'
import MaterialIcon from '../../../../others/icons/material-icon'

class CommentTools extends Component {
  state = {
    showOptions: false,
  }

  toggleOptions = () => this.setState({ showOptions: !this.state.showOptions })

  render() {
    let {
      commentDetails: { comment_by },
      commentDetails,
      updateCommentText,
      decrementComments,
    } = this.props
    let { showOptions } = this.state

    return (
      <Fragment>
        {(Me(comment_by) || isAdmin()) && (
          <span
            className="toggle_options"
            data-tip="Options"
            onClick={this.toggleOptions}
          >
            <MaterialIcon icon="expand_more" />
          </span>
        )}

        {(Me(comment_by) || isAdmin()) &&
          showOptions && (
            <div className="options comments_options">
              <ul>
                <EditCommentOption
                  commentDetails={commentDetails}
                  updateCommentText={updateCommentText}
                  toggleOptions={this.toggleOptions}
                />
                <DeleteCommentOption
                  commentDetails={commentDetails}
                  decrementComments={decrementComments}
                  toggleOptions={this.toggleOptions}
                />
              </ul>
            </div>
          )}

        <ToolTip />
      </Fragment>
    )
  }
}

CommentTools.propTypes = {
  commentDetails: PropTypes.shape({
    comment_id: PropTypes.number.isRequired,
    comment_by: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    commentSrc: PropTypes.string.isRequired,
  }).isRequired,
  decrementComments: PropTypes.func.isRequired,
  updateCommentText: PropTypes.func.isRequired,
}

export default connect()(CommentTools)
export { CommentTools as PureCommentTools }
