import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import FriendsList from './friends-list'
import { bottomScroll, cLoading, Me } from '../../../../utils/utils'
import { getFriends } from '../../../../actions/friend'
import PropTypes from 'prop-types'
import MonHeader from '../../../others/m-on/mon-header'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'

class Friends extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      dispatch,
      ud: { id },
    } = this.props
    dispatch(getFriends(id))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => bottomScroll()

  render() {
    let { friends, param: username, ud } = this.props
    let { loading } = this.state
    let len = friends.length
    let map_friends = friends.map(f => <FriendsList key={f.request_id} {...f} />)
    let nothingMssg = Me(ud.id)
      ? 'You have no friends!!'
      : `${username} have no friends!!`

    return (
      <div>
        <Title value={`@${username}'s friends`} />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames('senapati', 'pro_senapati', cLoading(loading))}
          >
            <div
              className={classNames({
                m_div: len != 0,
                m_no_div: len == 0,
              })}
            >
              <MonHeader len={len} forWhat={'friend'} />

              <div className="m_wrapper">{len != 0 && map_friends}</div>
            </div>
          </div>

          {!loading && len == 0 ? (
            <Nothing mssg={nothingMssg} />
          ) : !loading && len != 0 ? (
            <End />
          ) : null}
        </FadeIn>
      </div>
    )
  }
}

Friends.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  friends: store.Friend.friends,
})

export default connect(mapStateToProps)(Friends)
export { Friends as PureFriends }
