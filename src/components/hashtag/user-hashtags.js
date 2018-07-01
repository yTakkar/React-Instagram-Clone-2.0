import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserHashtags } from '../../actions/hashtag'
import PropTypes from 'prop-types'
import MapHashtags from './hashtag-utils/map-hashtags'
import HashtagHeader from './hashtag-utils/hashtag-header'

@connect(store => ({
  hashtags: store.Hashtag.userHashtags,
}))
export default class UserHashtags extends Component {
  componentDidMount = async () => {
    let { username, dispatch } = this.props
    dispatch(getUserHashtags(username))
  }

  render() {
    let { hashtags } = this.props
    let len = hashtags.length

    return (
      <div>
        {len != 0 && (
          <div className="recomm user-hashtags">
            <HashtagHeader text="Your recent hashtags" />
            <MapHashtags hashtags={hashtags} />
          </div>
        )}
      </div>
    )
  }
}

UserHashtags.propTypes = {
  username: PropTypes.string.isRequired,
}
