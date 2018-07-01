import React from 'react'
import Comment from './comment'
import PropTypes from 'prop-types'

const Comments = ({ when, comments, decrementComments }) => {
  let map_comments = comments
    ? comments.map(c => (
        <Comment
          key={c.comment_id}
          {...c}
          decrementComments={decrementComments}
        />
      ))
    : null

  return (
    <div>
      {when == 'viewPost' && <div className="comments_div">{map_comments}</div>}
    </div>
  )
}

Comments.propTypes = {
  when: PropTypes.string.isRequired,
  comments: PropTypes.array,
  decrementComments: PropTypes.func.isRequired,
}

export default Comments
