import React from 'react'
import { string } from 'prop-types'
import AppLink from '../../../../others/link/link'

const RecommendBy = ({ username }) => (
  <span className="recommend_by">
    by
    <AppLink url={`/profile/${username}`} label={` ${username}`} />
  </span>
)

RecommendBy.propTypes = {
  username: string.isRequired,
}

export default RecommendBy
