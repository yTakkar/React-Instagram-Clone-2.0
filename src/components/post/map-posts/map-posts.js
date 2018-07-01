import React, { Fragment } from 'react'
import Nothing from '../../others/nothing'
import { FadeIn } from 'animate-components'
import PropTypes from 'prop-types'

const MapPosts = ({ posts, nothingMssg }) => {
  let len = posts.length

  return (
    <Fragment>
      {len == 0 ? (
        <Nothing mssg={nothingMssg} />
      ) : (
        <FadeIn duration="500ms">{posts}</FadeIn>
      )}
    </Fragment>
  )
}

MapPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.node).isRequired,
  nothingMssg: PropTypes.string.isRequired,
}

export default MapPosts
