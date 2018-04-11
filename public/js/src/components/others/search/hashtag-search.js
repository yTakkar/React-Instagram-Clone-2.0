import React from 'react'
import { Link } from 'react-router-dom'

export default class HashtagSearch extends React.Component {
  render() {
    let { hashtag, clicked } = this.props

    return (
      <div className='s_d_peo' onClick={clicked} >
        <Link className='s_d_p h_d_p' to={`/hashtag/${hashtag}`} >
          <span className='s_d_username'>{hashtag}</span>
        </Link>
      </div>
    )
  }
}
