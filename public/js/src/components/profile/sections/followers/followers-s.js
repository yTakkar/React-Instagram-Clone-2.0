import React from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import FollowersList from './followers-list'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'
import { Me, humanReadable } from '../../../../utils/utils'
import { getFollowers } from '../../../../store/actions/follow_a'
import Spinner from '../../../others/spinner'

@connect(store => (
  {
    ud: store.User.user_details,
    followers: store.Follow.followers
  }
))

export default class Followers extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, ud: { id } } = this.props
    dispatch(getFollowers(id))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { followers, param: username, ud: { id } } = this.props,
      { loading } = this.state,
      map_followers = followers.map(f => <FollowersList key={f.follow_id} {...f} /> ),
      len = followers.length

    return (
      <div>

        <Title value={`@${username}'s followers`} />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div className={`senapati pro_senapati ${loading ? 'cLoading' : ''}`}>
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              {
                len != 0
                  ? <div className='m_header'><span>{humanReadable(len, 'follower')}</span></div>
                  : null
              }

              <div className='m_wrapper'>
                { len != 0 ? map_followers : null }
              </div>

            </div>
          </div>

          {
            !loading && len == 0
              ? <Nothing mssg={ Me(id) ? 'You have no followers!!' : `${username} have no followers!!` } />
              : !loading && len != 0 ? <End/>
                : null
          }

        </FadeIn>

      </div>
    )
  }
}
