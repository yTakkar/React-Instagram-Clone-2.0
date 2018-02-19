import React from 'react'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../utils/utils'
import ImageTheatre from '../../others/image-theatre'
import Overlay from '../../others/overlay'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { deleteComment } from '../../../store/actions/post-a'
import { post } from 'axios'
import Notify from 'handy-notification'
import Prompt from '../../others/prompt'
import EditComment from './edit-comment'
import ToTags from '../../hashtag/toTags'

@connect(store => {
  return {
    store
  }
})

export default class Comment extends React.Component {

  state = {
    text: '',
    openImage: false,
    deleteComment: false,
    editComment: false
  }

  componentDidMount = () =>
    this.setState({ text: this.props.text })

  _toggle = what => {
    if (what == 'openImage'){
      this.setState({ openImage: !this.state.openImage })
    } else if (what == 'deleteComment') {
      this.setState({ deleteComment: !this.state.deleteComment })
    } else if (what == 'editComment') {
      this.setState({ editComment: !this.state.editComment })
    }
  }

  showTools = () =>
    Me(this.props.comment_by) ? this.ct.style.display = 'block' : null

  hideTools = () =>
    Me(this.props.comment_by) ? this.ct.style.display = 'none' : null

  deleteComment = async e => {
    e.preventDefault()
    let { dispatch, comment_id, type, commentSrc, decrementComments } = this.props
    await post('/api/delete-comment', { comment_id, type, commentSrc })
    dispatch(deleteComment(comment_id))
    decrementComments()
    Notify({ value: 'Comment deleted!!' })
  }

  render() {
    let
      { comment_id, comment_by, comment_by_username, type, commentSrc, comment_time } = this.props,
      { text, openImage, deleteComment, editComment } = this.state

    return (
      <div>
        <div
          className={`comments ${Me(comment_by) ? 'my_comment' : ''}`}
          onMouseOver={this.showTools}
          onMouseOut={this.hideTools}
        >
          <img className='comments_avatar' src={`/users/${comment_by}/avatar.jpg`} />

          <div className='comments_content'>
            <a href='#' className='comments_user'>{ comment_by_username }</a>

            {
              type == 'text' ? <p className='ce' ><ToTags str={text} /></p>
                : type == 'image' ? <img className='comments_img' onClick={() => this._toggle('openImage')} src={`/comments/${commentSrc}`} />
                  : type == 'sticker' ? <img className='comments_sticker' src={`/comments/${commentSrc}`} />
                    : null
            }

            <div className='comments_bottom'>
              <span className='comments_time'>{ TimeAgo(comment_time) }</span>
            </div>
            {
              Me(comment_by) ?
                <div className='comment_tools' ref={r => this.ct = r} >
                  {
                    type == 'text' ?
                      <span className='comment_edit' data-tip='Edit' onClick={() => this._toggle('editComment')} >
                        <i className='material-icons'>mode_edit</i>
                      </span>
                      : null
                  }
                  <span className='comment_delete' data-tip='Delete' onClick={() => this._toggle('deleteComment')} >
                    <i className='material-icons'>delete</i>
                  </span>
                </div>
                : null
            }

          </div>
        </div>

        <ToolTip/>

        {
          openImage ?
            <div>
              <Overlay
                close_on_click={true}
                close={() => this._toggle('openImage')}
                opacity={0.9}
              />
              <ImageTheatre
                imgSrc={`/comments/${commentSrc}`}
                showInfo={false}
              />
            </div>
            : null
        }

        {
          deleteComment ?
            <div>
              <Overlay/>
              <Prompt
                title='Delete comment'
                content="This comment will be deleted. There's no undo so you won't be able to find it."
                actionText= 'Delete'
                action={this.deleteComment}
                back={() => this._toggle('deleteComment')}
              />
            </div>
            : null
        }

        {
          editComment ?
            <div>
              <Overlay/>
              <EditComment
                comment={text}
                back={() => this._toggle('editComment')}
                updateComment={value => this.setState({ text: value }) }
                comment_id={comment_id}
              />
            </div>
            : null
        }

      </div>
    )
  }
}
