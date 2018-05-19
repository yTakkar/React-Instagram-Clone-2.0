import React, { Fragment, Component } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import Overlay from '../../../../others/overlay'
import EditComment from '../../edit-comment'
import PropTypes from 'prop-types'

export default class EditCommentOption extends Component {

  state = {
    editComment: false
  }

  showEditModal = e => {
    e.preventDefault()
    this.setState({ editComment: !this.state.editComment })
  }

  render() {
    let {
      commentDetails: { comment_id, type, text },
      updateCommentText,
      toggleOptions
    } = this.props
    let { editComment } = this.state

    return (
      <Fragment>
        {
          type == 'text' ?
            <li>
              <a
                href='#'
                onClick={this.showEditModal}
              >{`Edit comment ${isAdmin() ? 'as admin' : ''}`}</a>
            </li>
            : null
        }

        {
          editComment ?
            <Fragment>
              <Overlay/>
              <EditComment
                comment={text}
                back={() => {
                  toggleOptions()
                  this.setState({ editComment: false })
                }}
                updateComment={value => updateCommentText(value) }
                comment_id={comment_id}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

EditCommentOption.propTypes = {
  commentDetails: PropTypes.shape({
    comment_id: PropTypes.number.isRequired,
    comment_by: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    commentSrc: PropTypes.string.isRequired
  }).isRequired,
  updateCommentText: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired,
}
