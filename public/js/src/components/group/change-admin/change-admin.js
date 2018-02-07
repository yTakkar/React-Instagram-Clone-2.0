import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Nothing from '../../others/nothing'
import { connect } from 'react-redux'
import Spinner from '../../others/spinner'
import { llr } from '../../../utils/utils'
import InviteList from './ca-list'
import { getUsersToMakeAdmin } from '../../../store/actions/group-a'
import $ from 'jquery'

@connect(store => {
  return {
    members: store.Group.usersToMakeAdmin
  }
})

export default class ChangeAdmin extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    $('.pro_banner_options').hide()
    let { dispatch, group } = this.props
    dispatch(getUsersToMakeAdmin(group))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let
      { loading } = this.state,
      { members, back, group } = this.props,
      len = members.length,
      map_users = members.map(u =>
        <InviteList
          key={u.grp_member_id}
          {...u}
          back={back}
          group={group}
        />
      )

    return (
      <div class='likes modal modal_big' >

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Transfer admin position</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div className={`modal_main ${loading ? 'cLoading' : ''}`}>
              { len == 0 ? <Nothing showMssg={false} /> : map_users }
            </div>

          </Scrollbars>

          <div className='modal_bottom'>
            <a href='#' className='pri_btn' onClick={back} >Back</a>
          </div>
        </FadeIn>

      </div>
    )
  }
}
