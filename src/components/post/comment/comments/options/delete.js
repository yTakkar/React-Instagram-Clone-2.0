import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import Overlay from '../../../../others/overlay'
import Prompt from '../../../../others/prompt'
import { deleteComment } from '../../../../../actions/post'
import Notify from 'handy-notification'
import { post } from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

@connect()
export default class DeleteCommentOption extends Component {

  state = {
    deleteComment: false
  }

  showPrompt = e => {
    e.preventDefault()
    this.setState({ deleteComment: !this.state.editComment })
  }

  deleteComment = async e => {
    e.preventDefault()
    let {
      commentDetails: { comment_id, type, commentSrc },
      dispatch,
      decrementComments
    } = this.props
    await post('/api/delete-comment', { comment_id, type, commentSrc })
    dispatch(deleteComment(comment_id))
    decrementComments()
    Notify({ value: 'Comment deleted!!' })
  }

  render() {
    let { deleteComment } = this.state
    let { toggleOptions } = this.props

    return (
      <Fragment>
        <li>
          <a
            href='#'
            onClick={this.showPrompt}
          >{`Delete comment ${isAdmin() ? 'as admin' : ''}`}</a>
        </li>

        {
          deleteComment ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Delete comment'
                content="This comment will be deleted. There's no undo so you won't be able to find it."
                actionText= 'Delete'
                action={this.deleteComment}
                back={() => {
                  toggleOptions()
                  this.setState({ deleteComment: false })
                }}
              />
            </Fragment>
            : null
        }

      </Fragment>
    )
  }
}

DeleteCommentOption.propTypes = {
  commentDetails: PropTypes.shape({
    comment_id: PropTypes.number.isRequired,
    comment_by: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    commentSrc: PropTypes.string.isRequired
  }).isRequired,
  decrementComments: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired
}
