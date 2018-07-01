import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'
import { newConversation } from '../../../../utils/message-utils'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'

class BannerMessageUser extends Component {
  state = {
    messagedUser: false,
  }

  messageUser = e => {
    e.preventDefault()
    let {
      ud: { id, username },
      toggleOptions,
    } = this.props
    newConversation({
      user: id,
      username,
      updateConversations: false,
      done: () => this.setState({ messagedUser: true }),
    })
    toggleOptions()
  }

  render() {
    let {
      ud: { id },
      isFollowing,
    } = this.props
    let { messagedUser } = this.state

    return (
      <Fragment>
        {messagedUser && <Redirect to="/messages" />}
        {isFollowing &&
          !Me(id) && (
            <li>
              <a href="#" onClick={this.messageUser}>
                Message
              </a>
            </li>
          )}
      </Fragment>
    )
  }
}

BannerMessageUser.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  isFollowing: store.Follow.isFollowing,
})

export default connect(mapStateToProps)(BannerMessageUser)
export { BannerMessageUser as PureBannerMessageUser }
