import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'

const RecommendBy = ({ username }) => (
  <span className='recommend_by' >by
    <Link
      to={`/profile/${username}`}
    > {username}</Link>
  </span>
)

RecommendBy.propTypes = {
  username: string.isRequired
}

export default RecommendBy
