import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getGroupHashtags } from '../../store/actions/hashtag-a'

@connect(store => (
  { hashtags: store.Hashtag.groupHashtags }
))

export default class GroupHashtags extends React.Component {

  componentDidMount = async () => {
    let { group, dispatch } = this.props
    dispatch(getGroupHashtags(group))
  }

  render() {
    let
      { hashtags } = this.props,
      len = hashtags.length,
      map_hashtags = hashtags.map(h =>
        <Link
          key={h.hashtag}
          className='uh_link'
          to={`/hashtag/${h.hashtag}`}
        >#{h.hashtag}</Link>
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
