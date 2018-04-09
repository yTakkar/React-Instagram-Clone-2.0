import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { getUserDetails } from '../../../../store/actions/user-a'
import $ from 'jquery'
import Spinner from '../../../others/spinner'
import { post } from 'axios'
import Notify from 'handy-notification'
import { getBlockedUsers } from '../../../../store/actions/settings-a'
import Nothing from '../../../others/nothing'
import BlockedUser from './blocked-user'

@connect(store => (
  {
    ud: store.User.user_details,
    blockedUsers: store.Setting.blockedUsers
  }
))

export default class ProfileSettings extends React.Component {

  state = {
    loading: true,
    type: 'public'
  }

  componentDidMount = () => {
    let { dispatch } = this.props
    let username = $('.data').data('username')
    dispatch(getUserDetails(username))
    dispatch(getBlockedUsers())
  }

  componentWillReceiveProps = ({ ud: { account_type } }) =>
    this.setState({ loading: false, type: account_type })

  changeType = async ({ target: { value: type } }) => {
    this.setState({ type })
    await post('/api/change-account-type', { type })
    Notify({ value: `Changed account type to ${type}` })
  }

  render() {
    let
      { loading, type } = this.state,
      { blockedUsers } = this.props,
      len = blockedUsers.length,
      map_users = blockedUsers.map(b =>
        <BlockedUser key={b.block_id} {...b} />
      )

    return (
      <div>

        <Title value='Profile settings' />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div className={`pro_settings ${loading ? 'cLoading' : ''}`} >

            <div className='acc_type'>
              <div className='set_header acc_type_header'>
                <span className='acc_type_h'>Change account type</span>
                <span>Select your account type, currently it's <span className='type_indicator'>{type}</span></span>
              </div>
              <div className='acc_type_main'>
                <select value={type} className='acc_select' onChange={this.changeType} >
                  <option value='public'>Public</option>
                  <option value='private'>Private</option>
                </select>
                <span className='bold'>Note:</span>
                <span>When account is <span className='bold'>private only your followers can interact with with your profile.</span> Others would have to follow you first to interact. This is the <span className='bold'>recommended</span> option as only people you know would interact with your profile.</span>
                <span>And when account is public <span className='bold'>anyone can see your profile and interact with your profile.</span></span>
              </div>
            </div>

            <div className='blocking'>
              <div class='set_header block_header'>
                <span class='acc_type_h'>Your blocked members</span>
              </div>
              {
                len == 0
                  ? <Nothing mssg='No blocked members' />
                  : map_users
              }
            </div>

          </div>

        </FadeIn>

      </div>
    )
  }
}
