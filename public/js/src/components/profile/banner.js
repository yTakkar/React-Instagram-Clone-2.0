import React from 'react'
import { toggle } from '../../utils/utils'
import $ from 'jquery'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Copy from 'handy-copy'
import Notify from 'handy-notification'
import * as fn from '../../utils/utils'
import Avatars from '../others/avatars'
import Overlay from '../others/overlay'
import ViewAvatar from '../others/viewAvatar'
import ToolTip from 'react-tooltip'
import { PORT } from '../../../../../browser-env'
import RecommendUsers from '../others/recommend/recommend-users'
import { toggleFollow } from '../../store/actions/follow_a'

@connect(store => {
  return {
    User: store.User,
    Follow: store.Follow,
    posts: store.Post.posts
  }
})

export default class Banner extends React.Component {

  state = {
    changeAvatar: false,
    viewAvatar: false,
    recommendUser: false
  }

  toggleOptions = when => {
    let element = document.querySelector(
      when == 'options'
        ? '.pro_banner_options'
        : '.pro_avatar_ch_teaser'
    )
    toggle(element)
  }

  toggleTags = () => $('.pro_tags').slideToggle('fast')

  copyLink = e => {
    e.preventDefault()
    let { username } = this.props.User.user_details
    Copy({
      value: `http://localhost:${PORT}/profile/${username}`,
      done: () => {
        Notify({ value: 'Link copied!!' })
        this.toggleOptions('options')
      }
    })
  }

  follow = e => {
    e.preventDefault()
    let { dispatch, User: { user_details: { id, username } } } = this.props
    fn.follow({
      user: id,
      username,
      dispatch,
      update_followers: true,
      done: () => dispatch(toggleFollow(true))
    })
  }

  unfollow = e => {
    e.preventDefault()
    let { dispatch, User: { user_details: { id } } } = this.props
    fn.unfollow({
      user: id,
      dispatch,
      update_followers: true,
      done: () => dispatch(toggleFollow(false))
    })
  }

  toggleAvatars = e => {
    e ? e.preventDefault() : null
    this._toggle('changeAvatar')
  }

  _toggle = what => {
    this.setState({
      [what]: !this.state[what]
    })
  }

  showRecommendUsers = e => {
    e.preventDefault()
    this._toggle('recommendUser')
    this.toggleOptions('options')
  }

  addToFavourites = async e => {
    e.preventDefault()
    let { User: { user_details: { id } } } = this.props
    this.toggleOptions('options')
    fn.addToFavourites(id)
  }

  render() {
    let
      {
        User: { user_details: { id, username, firstname, surname, bio }, tags },
        Follow: { isFollowing, followers, followings, profile_views, favourites, recommendations },
        posts
      } = this.props,
      { changeAvatar, viewAvatar, recommendUser } = this.state,
      url = `/profile/${username}`,
      tags_len = tags.length,
      map_tags = tags.map(t => <NavLink to='/' key={t.tag} className='tags'>{t.tag}</NavLink>)

    return (
      <div className='pro_banner'>

        <div className='pro_top'>
          <div className='pro_more'>
            <span className='pro_more_horiz' onClick={() => this.toggleOptions('options')} data-tip='Options' >
              <i className='material-icons'>more_horiz</i>
            </span>
          </div>
          <div className='options pro_banner_options' style={{ display: 'none' }} >
            <ul>
              { !fn.Me(id) ? <li><a href='#' className='pro_recommend' onClick={this.showRecommendUsers} >Recommend</a></li> : null }
              { !fn.Me(id) ? <li><a href='#' className='add_fav' onClick={this.addToFavourites} >Add to favourites</a></li> : null }
              { !fn.Me(id) ? <li><Link to='/messages' className='add_fav'>Message</Link></li> : null }
              <li><a href='#' className='p_copy_link' onClick={this.copyLink} >Copy profile link</a></li>
            </ul>
          </div>
          <div className='pro_ff' >
            {
              fn.Me(id)
                ? <Link to='/edit-profile' className='pri_btn ff'>Edit profile</Link>
                : isFollowing
                  ? <a href='#' className='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a>
                  : <a href='#' className='pri_btn follow' onClick={this.follow} >Follow</a>
            }
          </div>

        </div>

        <div
          className='pro_avatar'
          onMouseOver={() => this.toggleOptions('avatar')}
          onMouseOut={() => this.toggleOptions('avatar')}
        >
          <img src={ id ? `/users/${id}/avatar.jpg` : '/images/spacecraft.jpg' } alt='avatar' />
          <div className='pro_avatar_ch_teaser' style={{ display: 'none' }} >
            <span className='view_avatar_span' onClick={() => this._toggle('viewAvatar')} >View</span>
            { fn.Me(id) ? <span className='change_pro' onClick={() => this._toggle('changeAvatar')} >Change</span> : null }
          </div>
        </div>

        <div className='pro_info'>
          <div className='pro_username'>
            <Link to={`${url}`} className='username'>{username}</Link>
          </div>
          <div className='pro_name'>
            <span>{firstname} {surname}</span>
          </div>
          <div className='pro_bio'>
            <span>{bio}</span>
          </div>
        </div>

        <div className='pro_exp_more' onClick={this.toggleTags} >
          <span data-tip='Tags' ><i className='material-icons'>expand_more</i></span>
        </div>

        <div className='pro_tags' >
          {
            tags_len != 0
              ? map_tags
              : `${fn.Me(id) ? 'You' : username} have no tags!!`
          }
          { tags_len == 0 && fn.Me(id) ? <NavLink to='/edit-profile' className='add_tags'>add</NavLink> : null }
        </div>

        <hr/>

        <div className='pro_bottom'>
          <div className='pro_post stat_disabled'>
            <span className='pro_hg'>{posts.length}</span>
            <span className='pro_nhg'>Posts</span>
          </div>
          <Link to={`${url}/followers`} className='pro_followers'>
            <span className='pro_hg no_of_followers'>{followers.length}</span>
            <span className='pro_nhg'>Followers</span>
          </Link>
          <Link to={`${url}/followings`} className='pro_followings'>
            <span className='pro_hg no_of_followings'>{followings.length}</span>
            <span className='pro_nhg'>Following</span>
          </Link>
          {
            fn.Me(id) ?
              <Link to={`${url}/recommendations`} className='pro_recomm'>
                <span className='pro_hg'>{recommendations.length}</span>
                <span className='pro_nhg'>Recommendations</span>
              </Link>
              : null
          }
          {
            !fn.Me(id) ?
              <Link to={`${url}/favourites`} className='pro_fav'>
                <span className='pro_hg'>{ favourites.length }</span>
                <span className='pro_nhg'>Favourites</span>
              </Link>
              : null
          }
          <div className='pro_views stat_disabled'>
            <span className='pro_hg'>{ profile_views }</span>
            <span className='pro_nhg'>Profile views</span>
          </div>
        </div>

        <ToolTip/>

        {
          changeAvatar ?
            <div>
              <Overlay/>
              <Avatars
                back={() => this._toggle('changeAvatar')}
                of='user'
              />
            </div>
            : null
        }

        {
          viewAvatar ?
            <div>
              <Overlay
                close_on_click={true}
                close={() => this._toggle('viewAvatar')}
                opacity={0.9}
              />
              <ViewAvatar imgSrc={`/users/${id}/avatar.jpg`} />
            </div>
            : null
        }

        {
          recommendUser ?
            <div>
              <Overlay/>
              <RecommendUsers
                back={() => this._toggle('recommendUser')}
              />
            </div>
            : null
        }

      </div>

    )
  }
}
