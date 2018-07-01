import React, { Fragment } from 'react'
import ToTags from '../../../hashtag/toTags/toTags'
import PropTypes from 'prop-types'
import CommentTypeImage from './type-image'

const CommentType = ({ type, text, commentSrc }) => {
  let noComment = {
    fontStyle: 'italic',
    display: 'block',
  }

  return (
    <Fragment>
      {// if no comment
      type == 'text' && !text ? (
        <span style={noComment}>Empty comment</span>
      ) : // if text comment
      type == 'text' ? (
        <p className="ce">
          <ToTags str={text} />
        </p>
      ) : // if image comment
      type == 'image' ? (
        <CommentTypeImage commentSrc={commentSrc} />
      ) : // if sticker comment
      type == 'sticker' ? (
        <img className="comments_sticker" src={`/comments/${commentSrc}`} />
      ) : // else nothing
      null}
    </Fragment>
  )
}

CommentType.propTypes = {
  type: PropTypes.oneOf(['text', 'image', 'sticker']).isRequired,
  text: PropTypes.string,
  commentSrc: PropTypes.string,
}

export default CommentType
