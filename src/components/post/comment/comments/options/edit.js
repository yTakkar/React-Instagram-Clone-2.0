import React, { Fragment, Component } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import EditComment from '../../edit-comment/edit-comment'
import PropTypes from 'prop-types'

export default class EditCommentOption extends Component {
  state = {
    editComment: false,
  }

  showEditModal = e => {
    e.preventDefault()
    this.setState({ editComment: !this.state.editComment })
  }

  modalBack = () => {
    this.setState({ editComment: false })
    this.props.toggleOptions()
  }

  render() {
    let {
      commentDetails: { comment_id, type, text },
      updateCommentText,
    } = this.props
    let { editComment } = this.state

    return (
      <Fragment>
        {type == 'text' && (
          <li>
            <a href="#" onClick={this.showEditModal}>{`Edit comment ${
              isAdmin() ? 'as admin' : ''
            }`}</a>
          </li>
        )}

        {editComment && (
          <EditComment
            comment={text}
            back={this.modalBack}
            updateComment={value => updateCommentText(value)}
            comment_id={comment_id}
          />
        )}
      </Fragment>
    )
  }
}

EditCommentOption.propTypes = {
  commentDetails: PropTypes.shape({
    comment_id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  updateCommentText: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired,
}
