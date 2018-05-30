import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const HashtagSearch = ({ hashtag, clicked }) => {
  let to = `/hashtag/${hashtag.slice(1)}`

  return (
    <div className='s_d_peo' onClick={clicked} >
      <Link className='s_d_p h_d_p' to={to} >
        <span className='s_d_username'>{hashtag}</span>
      </Link>
    </div>
  )
}

HashtagSearch.propTypes = {
  hashtag: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
}

export default HashtagSearch
