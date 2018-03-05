import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Nothing from '../../others/nothing'
import { connect } from 'react-redux'
import Spinner from '../../others/spinner'
import { getUsersToRecommend } from '../../../store/actions/follow_a'
import RecommendUsersList from './ru-list'
import { llr } from '../../../utils/utils'

@connect(store => (
  {
    users: store.Follow.usersToRecommend,
    ud: store.User.user_details
  }
))

export default class RecommendUsers extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, ud: { id } } = this.props
    dispatch(getUsersToRecommend(id))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  render() {
    let
      { loading } = this.state,
      { users, back } = this.props,
      len = users.length,
      map_users = users.map(u =>
        <RecommendUsersList
          key={u.follow_id}
          {...u}
          back={back}
        />
      )

    return (
      <div class='likes modal modal_big' >

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Recommend</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div className={`modal_main ${loading ? 'cLoading' : ''}`}>
              { len == 0 ? <Nothing showMssg={false} /> : map_users }
            </div>

          </Scrollbars>

          <div className='modal_bottom'>
            <a href='#' className='pri_btn' onClick={this.back} >Back</a>
          </div>
        </FadeIn>

      </div>
    )
  }
}
