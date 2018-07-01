import React, { Component, Fragment } from 'react'
import { imageComment } from '../../../../utils/comment-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../others/icons/material-icon'
import FileInput from '../../../others/input/file'

class ImageComment extends Component {
  state = {
    commentFile: '',
  }

  commentFileChanged = async e => {
    let {
      postDetails: { post_id, when, user },
      dispatch,
      incrementComments,
    } = this.props
    this.setState({ commentFile: e.target.value })
    await imageComment({
      post_id,
      dispatch,
      when,
      user,
      file: e.target.files[0],
      done: () => incrementComments(),
    })
  }

  fileLabel = () => (
    <Fragment>
      <div data-tip="Attach a file">
        <MaterialIcon icon="attach_file" />
      </div>
    </Fragment>
  )

  render() {
    let { commentFile } = this.state

    return (
      <div>
        <form className="p_comment_form" encType="multipart/form-data">
          <FileInput
            value={commentFile}
            fileChange={this.commentFileChanged}
            label={this.fileLabel}
          />
        </form>
      </div>
    )
  }
}

ImageComment.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
  }).isRequired,
  incrementComments: PropTypes.func.isRequired,
}

export default connect()(ImageComment)
export { ImageComment as PureImageComment }
