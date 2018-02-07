import React from 'react'
import { toggle } from '../../utils/utils'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

export default class SideBar extends React.Component {

  toggle = e => {
    e.preventDefault()
    let ele = document.querySelector('.nav_options')
    toggle(ele)
  }

  render() {
    let
      username = $('.data').data('username'),
      { un, uc } = this.props

    return (
      <div className='m_n_wrapper'>
        <div className='m_n'>
          <ul className='m_n_ul'>
            <li className='m_n_li'>
              <NavLink to={`/profile/${username}`} exact activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>@{username}</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to='/' exact activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Home</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to='/explore' activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Explore</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to='/notifications' activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Notifications</span>
                {
                  un
                    ? <span className='m_n_new'>{ un > 9 ? '+' : un }</span>
                    : null
                }
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to='/messages' activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Messages</span>
                {
                  uc
                    ? <span className='m_n_new'>{ uc > 9 ? '+' : uc }</span>
                    : null
                }
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to={`/profile/${username}/bookmarks`} exact activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Bookmarks</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to={`/profile/${username}/gallery`} exact activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Gallery</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to={`/profile/${username}/favourites`} activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Favourites</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to={`/profile/${username}/groups`} activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Groups</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to={`/profile/${username}/recommendations`} className='m_n_a favourites' activeClassName='sidebar_active' >
                <span className='m_n_text'>Recommendations</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to='/edit-profile' activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Edit profile</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
            <li className='m_n_li'>
              <NavLink to='/settings' activeClassName='sidebar_active' className='m_n_a' >
                <span className='m_n_text'>Settings</span>
                <span className='m_n_new'></span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className='m_n_bottom'>
          <ul>
            <li><a href='/logout'>Logout</a></li>
            <li><a href='/help'>Help</a></li>
            <li><a href='#' className='' onClick={this.toggle} ><i className='material-icons'>more_horiz</i></a></li>
          </ul>
        </div>

        <div className='options nav_options' style={{ display: 'none' }}>
          <ul>
            <li><a href='/about'>About</a></li>
            <li><a href='/developer'>Developer</a></li>
          </ul>
        </div>

      </div>

    )
  }
}
