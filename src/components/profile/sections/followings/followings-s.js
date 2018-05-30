import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import FollowingsList from './followings-list'
import Title from '../../../others/title'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import { getFollowings } from '../../../../actions/follow'
import MonHeader from '../../../others/m-on/mon-header'
import PropTypes from 'prop-types'
import IsLoading from '../../../others/isLoading'
import FollowSectionEnd from '../../../others/follow/follow-section-end'

@connect(store => (
  {
    ud: store.User.user_details,
    followings: store.Follow.followings
  }
))

export default class Followings extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, ud: { id } } = this.props
    dispatch(getFollowings(id))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => bottomScroll()

  render() {
    let
      { followings, param: username } = this.props,
      { loading } = this.state,
      len = followings.length,
      map_followings = followings.map(f =>
        <FollowingsList key={f.follow_id} {...f} />
      )

    return (
      <div>

        <Title value={`@${username}'s followings`} />

        <FadeIn duration='300ms'>

          <IsLoading loading={loading} />

          <div className={`senapati pro_senapati ${cLoading(loading)}`}>

            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >
              <MonHeader len={len} forWhat={'following'} />

              <div className='m_wrapper'>
                { len != 0 ? map_followings : null }
              </div>
            </div>

          </div>

          <FollowSectionEnd
            len={len}
            loading={loading}
            when='followings'
          />
        </FadeIn>

      </div>
    )
  }
}

Followings.propTypes = {
  param: PropTypes.string.isRequired
}
