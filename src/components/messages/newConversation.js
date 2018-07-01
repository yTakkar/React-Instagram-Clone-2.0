import React, { Component, Fragment } from 'react'
import SearchFollowings from '../others/search-followings/search-followings'
import { newConversation } from '../../utils/message-utils'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import FAIcon from '../others/icons/font-awesome-icon'
import PrimaryButton from '../others/button/primary-btn'

class NewConversation extends Component {
  state = {
    getUsersForNewCon: false,
  }

  _toggle = e => {
    e.preventDefault()
    this.setState({
      getUsersForNewCon: !this.state.getUsersForNewCon,
    })
  }

  createConversation = (user, username) => {
    let { dispatch } = this.props
    newConversation({
      user,
      username,
      dispatch,
      updateConversations: true,
      done: () => this.setState({ getUsersForNewCon: false }),
    })
  }

  btnLabel = () => (
    <Fragment>
      <FAIcon icon="plus" />
      <span>New conversation</span>
    </Fragment>
  )

  render() {
    let { getUsersForNewCon } = this.state

    return (
      <Fragment>
        <PrimaryButton onClick={this._toggle} label={this.btnLabel} />

        {getUsersForNewCon && (
          <FadeIn duration="300ms">
            <SearchFollowings
              placeholder="Search to message"
              when="new_con"
              done={(user, username) => this.createConversation(user, username)}
            />
          </FadeIn>
        )}
      </Fragment>
    )
  }
}

export default connect()(NewConversation)
export { NewConversation as PureNewConversation }
