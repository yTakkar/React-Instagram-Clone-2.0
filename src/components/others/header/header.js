import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from '../search/search'
import HeaderOptions from './header-options'
import HeaderTopLinks from './top-links'
import MaterialIcon from '../icons/material-icon'

export default class Header extends Component {

  state = {
    showOptions: false,
  }

  toggleOptions = () =>
    this.setState({ showOptions: !this.state.showOptions })

  render() {
    let { showOptions } = this.state

    return (
      <div className='header'>
        <div className='logo'>
          <Link to='/'>
            <img src='/images/instagram.jpg' alt='Instagram'/>
          </Link>
        </div>
        <Search/>
        <div className='header_right'>
          <HeaderTopLinks/>
          <span
            className='show_more'
            onClick={this.toggleOptions}
          >
            <MaterialIcon icon='expand_more' />
          </span>
        </div>
        {
          showOptions ?
            <HeaderOptions
              toggleOptions={this.toggleOptions}
            />
            : null
        }
      </div>
    )
  }
}

