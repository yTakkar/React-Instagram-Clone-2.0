import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import Title from '../others/title'

export default class Error extends React.Component{
  render(){

    let
      username = $('.data').data('username'),
      { params: { what } } = this.props.match,
      title, desc

    if (what == 'user_nf') {
      title = 'User not found'
      desc = 'user'
    } else if (what == 'post_nf'){
      title = 'Post not found'
      desc = 'post'
    } else if (what == 'group_nf') {
      title = 'Group not found'
      desc = 'group'
    } else {
      title = 'Error'
      desc = 'page'
    }

    return (
      <div className='error' >
        <Title value={`Oops!! ${title}`} />
        <FadeIn duration='300ms' >
          <div className='error_div'>
            <div className='error_info'>
              <span>Oops, the {desc} you're looking for does not exist!!</span>
            </div>
            <img src='/images/error.svg' alt='' />
            <div className='error_bottom'>
              <Link to={`/profile/${username}`} className='sec_btn error_home' >View profile</Link>
              <Link to='/' className='pri_btn error_login' >Try going to homepage</Link>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}
