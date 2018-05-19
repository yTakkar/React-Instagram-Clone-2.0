import React, { Component, Fragment } from 'react'
import ToolTip from 'react-tooltip'
import Overlay from '../../../others/overlay'
import Stickers from '../../../others/stickers/stickers'
import { stickerComment } from '../../../../utils/comment-utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../others/icons/material-icon'

@connect()
export default class StickerComment extends Component {

  state = {
    showStickers: false
  }

  stickerComment = sticker => {
    let {
      postDetails: { post_id, when, user },
      incrementComments,
      dispatch
    } = this.props
    stickerComment({
      sticker,
      post_id,
      user,
      when,
      dispatch,
      done: () => incrementComments()
    })
  }

  render() {
    let { showStickers } = this.state
    let { postDetails: { post_id, when, user } } = this.props

    return (
      <div>
        <span
          className='c_sticker'
          data-tip='Add sticker'
          onClick={() => this.setState({ showStickers: true })}
        ><MaterialIcon icon='face' />
        </span>

        <ToolTip/>

        {
          showStickers ?
            <Fragment>
              <Overlay/>
              <Stickers
                back={() => this.setState({ showStickers: false })}
                type='comment'
                post={post_id}
                postWhen={when}
                postOwner={user}
                stickerComment={sticker => this.stickerComment(sticker)}
              />
            </Fragment>
            : null
        }

      </div>
    )
  }
}

StickerComment.propTypes = {
  postDetails: PropTypes.shape({
    post_id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    when: PropTypes.string.isRequired,
  }).isRequired,
  incrementComments: PropTypes.func.isRequired,
}
