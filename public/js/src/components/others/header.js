import React from 'react'
import { toggle } from '../../utils/utils'
import { Link, NavLink } from 'react-router-dom'
import $ from 'jquery'
import Search from './search/search'

export default class Header extends React.Component {

  toggle = () => {
    let element = document.querySelector('.sp_options')
    toggle(element)
  }

  render() {
    let
      id = $('.data').data('session'),
      username = $('.data').data('username')

    return (
      <div className='header'>
        <div className='logo'>
          <Link to='/'><img src='/images/instagram.jpg' alt='Instagram'/></Link>
        </div>
        <Search/>
        <div className='header_right'>
          <NavLink to='/notifications' activeClassName='ha_active' className='notification'>
            <span className='notification_span nav_icon'>
              <i className='material-icons'>notifications_none</i>
            </span>
            <span className='links_span'>Notifications</span>
          </NavLink>
          <NavLink to={`/profile/${username}`} activeClassName='ha_active' className='sp'>
            <img src={`/users/${id}/avatar.jpg`} alt='avatar' className='sp_img' />
            <span className='sp_span'>{username}</span>
          </NavLink>
          <span className='show_more' onClick={this.toggle} >
            <i className='material-icons'>expand_more</i>
          </span>
        </div>
        <div className='sp_options options' style={{ display: 'none' }} >
          <ul className='o_ul'>
            <li className='o_li'>
              <a href='/settings' className='o_a' alt='Settings'>Settings</a>
            </li>
            <li className='o_li'>
              <NavLink to='/edit-profile' className='o_a' alt='Edit'>Edit</NavLink>
            </li>
            <li className='o_li'>
              <a href='/help' className='o_a' alt='Help'>Help</a>
            </li>
            <li className='o_li'>
              <a href='/about'>About</a>
            </li>
            <li className='o_li'>
              <a href='/developer'>Developer</a>
            </li>
            <li className='o_li o_divider'><hr className='menu_divider'/></li>
            <li className='o_li'>
              <a href='/logout' className='o_a' alt='Settings'>Logout</a>
            </li>
          </ul>
        </div>
      </div>

    )
  }
}
