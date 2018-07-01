import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../others/link/link'

const MapHashtags = ({ hashtags }) => {
  let map_hashtags = hashtags.map(h => (
    <AppLink
      key={h.hashtag}
      className="uh_link"
      url={`/hashtag/${h.hashtag.slice(1)}`}
      label={h.hashtag}
    />
  ))

  return (
    <Fragment>
      <div className="recomm_main">{map_hashtags}</div>
    </Fragment>
  )
}

MapHashtags.propTypes = {
  hashtags: PropTypes.array.isRequired,
}

export default MapHashtags
