import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { getUserDetails } from '../../../../actions/user'
import { getBlockedUsers } from '../../../../actions/settings'
import IsLoading from '../../../others/isLoading'
import { cLoading } from '../../../../utils/utils'
import classNames from 'classnames'

import BlockedUsers from './blocked-users/blocked-users'
import ChangeAccountType from './account-type/account-type'

class ProfileSettings extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      dispatch,
      session: { username },
    } = this.props
    dispatch(getUserDetails(username))
    dispatch(getBlockedUsers())
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { loading } = this.state

    return (
      <div>
        <Title value="Profile settings" />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div className={classNames('pro_settings', cLoading(loading))}>
            <ChangeAccountType />
            <BlockedUsers />
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
  // imp. as component removes the spinner when data is fetched & stored.
  // So we must return something that has been updated.
  // Since session data is never updated only initialized.
  session: store.User.session,
})

export default connect(mapStateToProps)(ProfileSettings)
export { ProfileSettings as PureProfileSettings }
