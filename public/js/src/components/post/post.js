import React from 'react'
import * as fn from '../../utils/utils'
import ToolTip from 'react-tooltip'
import TimeAgo from 'handy-timeago'
import { Link } from 'react-router-dom'
import Copy from 'handy-copy'
import { PORT } from '../../../../../browser-env'
import Notify from 'handy-notification'
import { post } from 'axios'
import Overlay from '../others/overlay'
import ImageTheatre from '../others/image-theatre'
import Likes from './likes/likes'
import Tags from './tags/tags'
import Share from './share/share'
import Sharers from './sharers/sharers'
import EditPost from './edit-post'
import Prompt from '../others/prompt'
import { deletePost, unbookmark } from '../../store/actions/post-a'
import { connect } from 'react-redux'
import $ from 'jquery'
import CommentPost from './comment/comment-post'
import Stickers from '../others/stickers'
import Comment from './comment/comment'
import ToHashtag from '../others/toTag'

@connect(store => {
  return {
    ud: store.User.user_details
  }
})

export default class Post extends React.Component {

  state = {
    description: '',
    liked: false,
    bookmarked: false,
    likes_count: 0,
    tags_count: 0,
    shares_count: 0,
    comments_count: 0,
    showImage: false,
    showLikes: false,
    showTags: false,
    showShare: false,
    showSharers: false,
    editPost: false,
    deletePost: false,
    commentPost: false,
    commentFile: '',
    showStickers: false
  }

  componentDidMount = async () => {
    let
      { description, likes_count, post_id, tags_count, shares_count, comments_count } = this.props,
      { data: liked } = await post('/api/liked-or-not', { post: post_id }),
      { data: bookmarked } = await post('/api/bookmarked-or-not', { post: post_id })
    await this.setState({ description, likes_count, tags_count, shares_count, comments_count, liked, bookmarked })
  }

  _toggle = what => {
    if (what == 'options') {
      fn.toggle(this.opt)
    } else {
      this.setState({ [what]: !this.state[what] })
    }
  }

  showEditPost = e => {
    e.preventDefault()
    this._toggle('editPost')
    $('.p_options').hide()
  }

  showDeletePost = e => {
    e.preventDefault()
    this._toggle('deletePost')
    $('.p_options').hide()
  }

  copyLink = e => {
    e.preventDefault()
    let { post_id } = this.props
    Copy({
      value: `http://localhost:${PORT}/post/${post_id}`,
      done: () => {
        Notify({ value: 'Link copied!!' })
        this._toggle('options')
      }
    })
  }

  like = async () => {
    let { state: { likes_count }, props: { post_id, user } } = this
    await post('/api/like-post', { post: post_id })

    !fn.Me(user)
      ? fn.insta_notify({ to: user, type: 'like', post_id })
      : null

    this.setState({
      likes_count: ++likes_count,
      liked: true
    })
  }

  unlike = async () => {
    let { state: { likes_count }, props: { post_id } } = this
    await post('/api/unlike-post', { post: post_id })
    this.setState({
      likes_count: --likes_count,
      liked: false
    })
  }

  bookmark = async () => {
    let { post_id } = this.props
    await post('/api/bookmark-post', { post: post_id })
    this.setState({ bookmarked: true })
    Notify({ value: 'Post bookmarked!!' })
  }

  unbookmark = async () => {
    let { post_id, when, dispatch, ud: { id } } = this.props
    await post('/api/unbookmark-post', { post: post_id })
    this.setState({ bookmarked: false })
    if (when == 'bookmarks' && fn.Me(id)) {
      dispatch(unbookmark(post_id))
      Notify({ value: 'Post unbookmarked!!' })
    }
  }

  deletePost = async e => {
    e.preventDefault()
    $('.prompt-done').addClass('a_disabled')
    let
      { post_id, dispatch, when } = this.props,
      username = $('.data').data('username')

    await post('/api/delete-post', { post: post_id })
    dispatch(deletePost(post_id))
    when == 'viewPost' ? location.href = `/profile/${username}` : null
    Notify({ value: 'Post deleted!!' })
  }

  commentFileChanged = e => {
    let
      { post_id, dispatch, when, user } = this.props,
      { comments_count } = this.state
    this.setState({ commentFile: e.target.value })
    fn.imageComment({ post_id, dispatch, when, user, file: e.target.files[0] })
    this.setState({ comments_count: ++comments_count })
  }

  stickerComment = sticker => {
    let
      { post_id, dispatch, when, user } = this.props,
      { comments_count } = this.state
    fn.stickerComment({ sticker, post_id, user, when, dispatch })
    this.setState({ comments_count: ++comments_count })
  }

  render() {
    let
      { post_id, user, username, firstname, surname, location, filter, imgSrc, type, group_id, group_name, post_time, when, share_by_username, share_time, comments } = this.props,
      { description, liked, bookmarked, likes_count, tags_count, shares_count, comments_count, showImage, showLikes, showTags, showShare, showSharers, editPost, deletePost, commentPost, commentFile, showStickers } = this.state,
      session = $('.data').data('session'),
      map_comments = typeof(comments) != 'undefined' ? comments.map(c =>
        <Comment
          key={c.comment_id}
          {...c}
          decrementComments={() => this.setState({ comments_count: --comments_count })}
        />
      ) : null
      // hashes = fn.toHashtag(description)

    return (
      <div className='posts' >

        {
          when == 'shared' ?
            <div className='post_share_info'>
              by <Link to={`/profile/${share_by_username}`} >{share_by_username}</Link>
              <span>{ share_time ? TimeAgo(share_time) : null }</span>
            </div>
            : null
        }

        <div className='p_i'>
          <div className='p_i_img'>
            <img src={`/users/${user}/avatar.jpg`} />
          </div>
          <div className='p_i_1' style={{ top: type == 'group' ? -8 : 'inherit' }} >
            <Link to={`/profile/${username}`} title={username}>{username}</Link>
            {
              type == 'group' ?
                <div className='its_grp_post' >
                  <span className='to_grp_arrow'>
                    <i className='material-icons'>arrow_drop_up</i>
                  </span>
                  <Link to={`/group/${group_id}`} className='to_grp_name'>{group_name}</Link>
                </div>
                : null
            }
            <span className='p_i_1_title' title={location ? location : null}>
              {
                location
                  ? fn.shortener(location, 35)
                  : `${firstname} ${surname}`
              }
            </span>
          </div>
          <div className='p_i_2'>
            <div className='p_time'>
              <span>{ post_time ? TimeAgo(post_time).replace(' ago', '') : null }</span>
            </div>
            <div className='p_h_opt' >
              <span className='exp_p_menu' onClick={() => this._toggle('options')} >
                <i className='material-icons'>expand_more</i>
              </span>
            </div>
          </div>

          <div
            className='options p_options'
            style={{
              display: 'none',
              top: when == 'shared' ? 80 : 48
            }}
            ref={r => this.opt = r}
          >
            <ul>
              { when != 'viewPost' ? <li><Link to={`/post/${post_id}`} >Open</Link></li> : null }
              { fn.Me(user) ? <li><a href='#' className='edit_post' onClick={this.showEditPost} >Edit post</a></li> : null }
              { fn.Me(user) ? <li><a href='#' className='delete_post' onClick={this.showDeletePost} >Delete post</a></li> : null }
              <li><a href='#' className='p_copy_link' onClick={this.copyLink} >Copy link</a></li>
            </ul>
          </div>
        </div>

        <div className='p_o'>
          <div className='p_actual' spellCheck='false'>
            <div className='p_abt' style={{ marginBottom: description ? '10px' : null }} >
              <p><ToHashtag str={`${description}`} /></p>
            </div>
            <img
              src={`/posts/${imgSrc}`}
              className={`p_img ${filter}`}
              onClick={() => this._toggle('showImage')}
            />
            {
              tags_count != 0 ?
                <div>
                  <span
                    className='p_tag_icon'
                    data-tip={`${fn.humanReadable(tags_count, 'tag')}`}
                    onClick={() => this._toggle('showTags')}
                  >
                    <i className="material-icons">account_circle</i>
                  </span>
                  <ToolTip/>
                </div>
                : null
            }
          </div>
        </div>

        <hr className='img_d_hr' />

        <div className='p_a'>
          <div className='p_do'>
            <div className='p_Like_wra'>
              {
                liked
                  ? <span
                    className='p_like'
                    data-tip='Unlike'
                    onClick={this.unlike}
                  ><i className='material-icons'>favorite</i></span>
                  : <span
                    className='p_like'
                    data-tip='Like'
                    onClick={this.like}
                  ><i className='material-icons'>favorite_border</i></span>
              }
            </div>
            <div className='p_bmrk_wra'>
              {
                bookmarked
                  ? <span
                    className='p_bookmark'
                    data-tip='Undo bookmark'
                    onClick={this.unbookmark}
                  ><i className='material-icons'>bookmark</i></span>
                  : <span
                    className='p_bookmark'
                    data-tip='Bookmark'
                    onClick={this.bookmark}
                  ><i className='material-icons'>bookmark_border</i></span>
              }
            </div>
            <div className='p_send_wra'>
              <span
                className='p_send'
                data-tip='Share'
                onClick={() => this._toggle('showShare')}
              ><i className='material-icons'>send</i></span>
            </div>
          </div>

          <div className='p_did'>
            <span
              className='p_likes likes'
              onClick={() => this._toggle('showLikes')}
            >{fn.humanReadable(likes_count, 'like')}</span>
            <span
              className='p_comm'
              onClick={() => this._toggle('showSharers')}
            >{fn.humanReadable(shares_count, 'share')}</span>
          </div>
        </div>

        <hr />

        <Link to={`/post/${post_id}`} className='p_comments' >{ fn.humanReadable(comments_count, 'comment') }</Link>

        <div className='p_cit'>
          <div className='p_cit_img'>
            <img src={`/users/${session}/avatar.jpg`} />
          </div>

          <div className='p_cit_main'>

            <div className='p_cit_teaser' onClick={() => this._toggle('commentPost')} >
              <span>Wanna comment?</span>
            </div>

            <div className='p_cit_tool'>
              <span className='c_sticker' data-tip='Add sticker' onClick={() => this._toggle('showStickers')} >
                <i className='material-icons'>face</i>
              </span>
              <form className='p_comment_form' encType='multipart/form-data'>
                <input
                  type='file'
                  className='p_comm_file_og'
                  id='p_comm_file'
                  accept='image/*'
                  value={commentFile}
                  onChange={this.commentFileChanged}
                />
                <label for='p_comm_file' className='p_cit_more' data-tip='Attach a file'>
                  <i className='material-icons'>attach_file</i>
                </label>
              </form>
            </div>

          </div>
        </div>

        {
          when == 'viewPost' ?
            <div className='comments_div'>
              { map_comments }
            </div>
            : null
        }

        {
          showImage ?
            <div>
              <Overlay
                close_on_click={true}
                close={() => this._toggle('showImage')}
                opacity={0.9}
              />
              <ImageTheatre
                imgSrc={`/posts/${imgSrc}`}
                filter={filter}
                username={username}
                time={post_time}
                link={`/post/${post_id}`}
              />
            </div>
            : null
        }

        {
          showLikes ?
            <div>
              <Overlay/>
              <Likes
                post={post_id}
                back={() => this._toggle('showLikes')}
              />
            </div>
            : null
        }

        {
          showTags ?
            <div>
              <Overlay/>
              <Tags
                post={post_id}
                back={() => this._toggle('showTags')}
                decrementTags={() => this.setState({ tags_count: --tags_count })}
              />
            </div>
            : null
        }

        {
          showShare ?
            <div>
              <Overlay/>
              <Share
                post={post_id}
                back={() => this._toggle('showShare')}
                postOwner={user}
                incrementShares={() => this.setState({ shares_count: ++shares_count })}
                decrementShares={() => this.setState({ shares_count: --shares_count })}
              />
            </div>
            : null
        }

        {
          showSharers ?
            <div>
              <Overlay/>
              <Sharers
                post={post_id}
                back={() => this._toggle('showSharers')}
                decrementShares={() => this.setState({ shares_count: --shares_count })}
              />
            </div>
            : null
        }

        {
          editPost ?
            <div>
              <Overlay/>
              <EditPost
                post={post_id}
                description={description}
                back={() => this._toggle('editPost')}
                changeDesc={value =>
                  this.setState({ description: value })
                }
              />
            </div>
            : null
        }

        {
          deletePost ?
            <div>
              <Overlay/>
              <Prompt
                title='Delete post'
                content="This post will be deleted. There's no undo so you won't be able to find it."
                actionText= 'Delete'
                action={this.deletePost}
                back={() => this._toggle('deletePost')}
              />
            </div>
            : null
        }

        {
          commentPost ?
            <div>
              <Overlay/>
              <CommentPost
                post={post_id}
                postOwner={user}
                back={() => this._toggle('commentPost')}
                incrementComments={() => this.setState({ comments_count: ++comments_count })}
                when={when}
              />
            </div>
            : null
        }

        {
          showStickers ?
            <div>
              <Overlay/>
              <Stickers
                back={() => this._toggle('showStickers')}
                type='comment'
                post={post_id}
                postWhen={when}
                postOwner={user}
                stickerComment={sticker => this.stickerComment(sticker)}
              />
            </div>
            : null
        }

        <ToolTip/>

      </div>
    )
  }
}
