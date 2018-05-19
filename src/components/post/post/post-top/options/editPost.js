import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import { Me } from '../../../../../utils/utils'
import Overlay from '../../../../others/overlay'
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

  render() {
    let {
      postDetails: { user, post_id, description },
      updateDescription,
      toggleOptions
    } = this.props
    let { editPost } = this.state

    return (
      <Fragment>
        {
          Me(user) || isAdmin() ?
            <li>
              <a href='#' className='edit_post' onClick={this.showEditPost}>
                  Edit post {isAdmin() ? 'as admin' : null}
              </a>
            </li>
            : null
        }

        {
          editPost ?
            <Fragment>
              <Overlay/>
              <EditPost
                post={post_id}
                description={description}
                back={() => {
                  this.setState({ editPost: false })
                  toggleOptions()
                }}
                changeDesc={value =>
                  updateDescription(value)
                }
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

EditPostOption.propTypes = {
  postDetails: PropTypes.shape({
    user: PropTypes.number.isRequired,
    post_id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  updateDescription: PropTypes.func.isRequired,
  toggleOptions: PropTypes.func.isRequired
}
