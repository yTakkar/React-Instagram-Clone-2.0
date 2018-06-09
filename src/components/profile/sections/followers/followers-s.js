import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import FollowersList from './followers-list'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import { getFollowers } from '../../../../actions/follow'
import PropTypes from 'prop-types'
import MonHeader from '../../../others/m-on/mon-header'
import FollowSectionEnd from '../../../others/follow/follow-section-end'
import IsLoading from '../../../others/isLoading'

class Followers extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, ud: { id } } = this.props
    dispatch(getFollowers(id))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => bottomScroll()

  render() {
    let
      { followers, param: username } = this.props,
      { loading } = this.state,
      len = followers.length,
      map_followers = followers.map(f =>
        <FollowersList key={f.follow_id} {...f} />
      )

    return (
      <div>

        <Title value={`@${username}'s followers`} />

        <FadeIn duration='300ms'>
          <IsLoading loading={loading} />

          <div className={`senapati pro_senapati ${cLoading(loading)}`}>
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              <MonHeader len={len} forWhat={'follower'} />

              <div className='m_wrapper'>
                { len != 0 ? map_followers : null }
              </div>

            </div>
          </div>

          <FollowSectionEnd
            len={len}
            loading={loading}
            when='followers'
          />
        </FadeIn>

      </div>
    )
  }
}

Followers.propTypes = {
  param: PropTypes.string.isRequired
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  followers: store.Follow.followers
})

export default connect(mapStateToProps)(Followers)
export { Followers as PureFollowers }
