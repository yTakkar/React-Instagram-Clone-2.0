import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { getUserDetails } from '../../../../store/actions/user-a'
import { getBlockedUsers } from '../../../../store/actions/settings-a'
import BlockedUsers from './blocked-users/blocked-users'
import ChangeAccountType from './account-type'
import IsLoading from '../../../others/isLoading'
import { cLoading } from '../../../../utils/utils'

@connect(store => (
  {
    store,
    // imp. as component removes the spinner when data is fetched & stored.
    // So we must return something that has been updated.
    // Since session data is never updated only initialized.
    session: store.User.session
  }
))

export default class ProfileSettings extends Component {

  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, session: { username } } = this.props
    dispatch(getUserDetails(username))
    dispatch(getBlockedUsers())
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let { loading } = this.state

    return (
      <div>
        <Title value='Profile settings' />

        <FadeIn duration='300ms'>
          <IsLoading loading={loading} />

          <div className={`pro_settings ${cLoading(loading)}`} >
            <ChangeAccountType/>
            <BlockedUsers/>
          </div>

        </FadeIn>
      </div>
    )
  }
}
