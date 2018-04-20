import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserHashtags } from '../../store/actions/hashtag-a'

@connect(store => (
  { hashtags: store.Hashtag.userHashtags }
))

export default class UserHashtags extends React.Component {

  componentDidMount = async () => {
    let { param, dispatch } = this.props
    dispatch(getUserHashtags(param))
  }

  render() {
    let
      { hashtags } = this.props,
      len = hashtags.length,
      map_hashtags = hashtags.map(h =>
        <Link
          key={h.hashtag}
          className='uh_link'
          to={`/hashtag/${h.hashtag.slice(1)}`}
        >{h.hashtag}</Link>
      )

    return (
      <div>

        {
          len != 0 ?
            <div className='recomm user-hashtags'>
              <div className='recomm_top'>
                <span>Your recent hashtags</span>
              </div>

              <div className='recomm_main' >
                { map_hashtags }
              </div>
            </div>
            : null
        }

      </div>
    )
  }
}
