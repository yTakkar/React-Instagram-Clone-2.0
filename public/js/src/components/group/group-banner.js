import React from 'react'
import { toggle, Me, joinGroup, leaveGroup } from '../../utils/utils'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Copy from 'handy-copy'
import Notify from 'handy-notification'
import ToolTip from 'react-tooltip'
import { PORT } from '../../../../../browser-env'
import $ from 'jquery'
import { toggleJoinGroup } from '../../store/actions/group-a'
import ViewAvatar from '../others/avatar/viewAvatar'
import Overlay from '../others/overlay'
import Avatars from '../others/avatar/avatars'
import Invite from './invite/invite'
import ChangeAdmin from './change-admin/change-admin'
import Prompt from '../others/prompt'
import { post } from 'axios'

@connect(store => {
  return {
    Group: store.Group
  }
})

export default class GroupBanner extends React.Component {

  state = {
    viewAvatar: false,
    changeAvatar: false,
    invite: false,
    changeAdmin: false,
    deleteGroup: false,
    deleted: false
  }

  toggleOptions = when => {
    let element = document.querySelector(
      when == 'options'
        ? '.pro_banner_options'
        : '.pro_avatar_ch_teaser'
    )
    toggle(element)
  }

  copyLink = e => {
    e.preventDefault()
    let { group_id } = this.props.Group.group_details
    Copy({
      value: `http://localhost:${PORT}/group/${group_id}`,
      done: () => {
        Notify({ value: 'Link copied!!' })
        this.toggleOptions('options')
      }
    })
  }

  _toggle = what =>
    this.setState({
      [what]: !this.state[what]
    })

  toggleInvite = e => {
    e.preventDefault()
    this._toggle('invite')
  }

  toggleChangeAdmin = e => {
    e.preventDefault()
    this._toggle('changeAdmin')
  }

  toggleDeleteGroup = e => {
    $('.pro_banner_options').hide()
    e.preventDefault()
    this._toggle('deleteGroup')
  }

  joinGroup = e => {
    e.preventDefault()
    let
      { dispatch, Group: { group_details: { group_id } } } = this.props,
      user = $('.data').data('session')
    joinGroup({
      user,
      added_by: user,
      group: group_id,
      when: 'normal',
      done: () => dispatch(toggleJoinGroup(true))
    })
  }

  leaveGroup = e => {
    e.preventDefault()
    let
      { dispatch, Group: { group_details: { group_id } } } = this.props,
      user = $('.data').data('session')
    leaveGroup({
      user,
      group: group_id,
      done: () => dispatch(toggleJoinGroup(false))
    })
  }

  delete = async e => {
    e.preventDefault()
    $('.prompt-done').addClass('a_disabled')
    let { Group: { group_details: { group_id } } } = this.props
    await post('/api/delete-group', { group: group_id })
    Notify({
      value: 'Group deleted!!',
      done: () => this._toggle('deleted')
    })
  }

  render() {
    let
      {
        Group: {
          group_details: { group_id, name, group_type, admin },
          joined
        }
      } = this.props,
      { viewAvatar, changeAvatar, invite, changeAdmin, deleteGroup, deleted } = this.state

    return (
      <div className='pro_banner'>

        { deleted ? <Redirect to='/' /> : null }

        <div className='pro_top'>
          <div className='pro_more'>
            <span className='pro_more_horiz' onClick={() => this.toggleOptions('options')} data-tip='Options' >
              <i className='material-icons'>more_horiz</i>
            </span>
          </div>
          <div className='options pro_banner_options' style={{ display: 'none' }} >
            <ul>
              <li><a href='#' className='p_copy_link' onClick={this.toggleInvite} >Invite to group</a></li>
              {
                Me(admin) ?
                  <li><a href='#' className='p_copy_link' onClick={this.toggleChangeAdmin} >Transfer admin position</a></li>
                  : null
              }
              {
                Me(admin) ?
                  <li><a href='#' className='p_copy_link' onClick={this.toggleDeleteGroup} >Delete group</a></li>
                  : null
              }
              <li><a href='#' className='p_copy_link' onClick={this.copyLink} >Copy profile link</a></li>
            </ul>
          </div>
          <div className='pro_ff' >
            {
              Me(admin)
                ? <Link to='/edit-group' className='pri_btn ff'>Edit profile</Link>
                : joined
                  ? <a href='#' className='pri_btn unfollow' onClick={this.leaveGroup} >Leave group</a>
                  : <a href='#' className='pri_btn follow' onClick={this.joinGroup} >Join group</a>
            }
          </div>

        </div>

        <div
          className='pro_avatar'
          onMouseOver={() => this.toggleOptions('avatar')}
          onMouseOut={() => this.toggleOptions('avatar')}
        >
          <img src={group_id ? `/groups/${group_id}/avatar.jpg`: '/images/wheel.jpg'} alt='avatar' />
          <div className='pro_avatar_ch_teaser' style={{ display: 'none' }} >
            <span className='view_avatar_span' onClick={() => this._toggle('viewAvatar')} >View</span>
            { Me(admin) ? <span className='change_pro' onClick={() => this._toggle('changeAvatar')} >Change</span> : null }
          </div>
        </div>

        <div className='pro_info'>
          <div className='pro_username'>
            <Link to='#' className='username'>{name}</Link>
          </div>
          <div className='pro_name'>
            {
              group_type == 'public' ?
                <span><i class='fa fa-globe' aria-hidden='true'></i> Public group</span>
                : <span><i class='fa fa-lock' aria-hidden='true'></i> Private group</span>
            }
          </div>
        </div>

        <ToolTip/>

        {
          viewAvatar ?
            <div>
              <Overlay
                close_on_click={true}
                close={() => this._toggle('viewAvatar')}
                opacity={0.9}
              />
              <ViewAvatar imgSrc={`/groups/${group_id}/avatar.jpg`} />
            </div>
            : null
        }

        {
          changeAvatar ?
            <div>
              <Overlay/>
              <Avatars
                back={() => this._toggle('changeAvatar')}
                of='group'
                group={group_id}
              />
            </div>
            : null
        }

        {
          invite ?
            <div>
              <Overlay/>
              <Invite
                back={this.toggleInvite}
                group={group_id}
              />
            </div>
            : null
        }

        {
          changeAdmin ?
            <div>
              <Overlay/>
              <ChangeAdmin
                back={this.toggleChangeAdmin}
                group={group_id}
              />
            </div>
            : null
        }

        {
          deleteGroup ?
            <div>
              <Overlay/>
              <Prompt
                title='Delete group'
                content="This group will be deleted. There's no undo so you won't be able to find it."
                actionText= 'Delete'
                action={this.delete}
                back={() => this._toggle('deleteGroup')}
              />
            </div>
            : null
        }

      </div>

    )
  }
}
