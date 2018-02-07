import React from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import FollowingsList from './followings-list'
import Title from '../../../others/title'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'
import { Me, humanReadable } from '../../../../utils/utils'
import { getFollowings } from '../../../../store/actions/follow_a'
import Spinner from '../../../others/spinner'

@connect(store => {
  return {
    ud: store.User.user_details,
    followings: store.Follow.followings
  }
})

export default class Followings extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, ud: { id } } = this.props
    dispatch(getFollowings(id))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { followings, param: username, ud: { id } } = this.props,
      { loading } = this.state,
      map_followings = followings.map(f => <FollowingsList key={f.follow_id} {...f} /> ),
      len = followings.length

    return (
      <div>

        <Title value={`@${username}'s followings`} />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div className={`senapati pro_senapati ${loading ? 'cLoading' : ''}`}>
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              {
                len != 0
                  ? <div className='m_header'><span>{humanReadable(len, 'following')}</span></div>
                  : null
              }

              <div className='m_wrapper'>
                { len != 0 ? map_followings : null }
              </div>

            </div>

          </div>

          {
            !loading && len == 0
              ? <Nothing mssg={ Me(id) ? 'You have no followings!!' : `${username} have no followings!!` } />
              : !loading && len != 0 ? <End/>
                : null
          }

        </FadeIn>

      </div>
    )
  }
}
