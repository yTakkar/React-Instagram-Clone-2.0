import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import { Me } from '../../../../../utils/utils'
import EditPost from '../../../edit-post/edit-post'
import PropTypes from 'prop-types'

export default class EditPostOption extends Component {
  state = {
    editPost: false,
  }

  showEditPost = e => {
    e ? e.preventDefault() : null
    this.setState({ editPost: !this.state.editPost })
  }

  modalBack = () => {
    this.setState({ editPost: false })
    this.props.toggleOptions()
  }

  render() {
    let {
      postDetails: { user, post_id, description },
      updateDescription,
    } = this.props
    let { editPost } = this.state

    return (
      <Fragment>
        {(Me(user) || isAdmin()) && (
          <li>
            <a href="#" className="edit_post" onClick={this.showEditPost}>
              Edit post {isAdmin() ? 'as admin' : ''}
            </a>
          </li>
        )}

        {editPost && (
          <EditPost
            post={post_id}
            description={description}
            back={this.modalBack}
            changeDesc={value => updateDescription(value)}
          />
        )}
      </Fragment>
    )
  }
}

EditPostOption.propTypes = {
  postDetails: PropTypes.shape({
    user: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  updateDescription: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired,
}
