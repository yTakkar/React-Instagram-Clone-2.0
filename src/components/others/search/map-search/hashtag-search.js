import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../../link/link'

const HashtagSearch = ({ hashtag, clicked }) => (
  <div className='s_d_peo' onClick={clicked} >
    <AppLink
      className='s_d_p h_d_p'
      url={`/hashtag/${hashtag}`}
    ><span className='s_d_username'>{hashtag}</span>
    </AppLink>
  </div>
)

HashtagSearch.propTypes = {
  hashtag: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
}

export default HashtagSearch
