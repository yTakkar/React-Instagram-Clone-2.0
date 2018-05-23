import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { connect } from 'react-redux'
import { forProfile, isPrivate, humanReadable, cLoading } from '../../utils/utils'
import { isAdmin } from '../../utils/admin-utils'
import { getUnreadNotifications } from '../../actions/notification'
import Banner from './banner/banner'
import Nav from './nav'
import Nothing from '../others/nothing'
import ProfileRoutes from './profile-routes'
import { getUnreadMessages } from '../../actions/message'
import IsLoading from '../others/isLoading'

@connect(store => (
  {
    ud: store.User.user_details,
    mutuals: store.User.mutualUsers,
    isFollowing: store.Follow.isFollowing,
  }
))

export default class Profile extends Component {

  state = {
    loading: true,
  }

  inv_user = () =>
    this.props.history.push('/error/user')

  componentDidMount = () => {
    let {
      match: { params: { username } },
      dispatch
    } = this.props
    forProfile({ username, dispatch, invalidUser: this.inv_user })
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = ({ dispatch, match }) => {
    if (this.props.match.url != match.url) {
      forProfile({
        dispatch,
        username: match.params.username,
        invalidUser: this.inv_user
      })
    }
    this.setState({ loading: false })
  }

  render() {
    let { loading } = this.state
    let {
      match: { url, params: { username } },
      isFollowing,
      ud: { id, firstname, surname, account_type },
      mutuals
    } = this.props

    return (
      <div>
        <Title
          value={`@${username} (${firstname} ${surname})`}
          desc={`Connect with ${username}'s profile`}
        />

        <div
          class='profile-data'
          id='profile-data'
          data-get-username={username}
          data-getid={id}
        ></div>

        <IsLoading loading={loading} when='page' />

        <FadeIn duration='300ms' className={cLoading(loading)} >
          <Banner />
          {
            !isPrivate(id, isFollowing, account_type) || isAdmin() ?
              <div>
                <Nav url={url} user={id} />
                <ProfileRoutes url={url} param={username} />
              </div>
              :
              <div style={{ marginTop: 85 }} >
                <Nothing
                  mssg={`Account is private. Follow to connect with ${username}!!`}
                  secondMssg={`${ mutuals.length != 0 ? humanReadable(mutuals.length, 'mutual follower') : '' }`}
                />
              </div>
          }
        </FadeIn>

      </div>
    )
  }
}
