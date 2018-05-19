import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const MapHashtags = ({ hashtags }) => {
  let map_hashtags = hashtags.map(h =>
    <Link
      key={h.hashtag}
      className='uh_link'
      to={`/hashtag/${h.hashtag.slice(1)}`}
    >{h.hashtag}</Link>
  )

  return (
    <Fragment>
      <div className='recomm_main' >
        { map_hashtags }
      </div>
    </Fragment>
  )
}

MapHashtags.propTypes = {
  hashtags: PropTypes.array.isRequired
}

export default MapHashtags
