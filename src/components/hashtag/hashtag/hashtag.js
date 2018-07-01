import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import PopularHashtags from './../popular-hashtags'
import UserHashtags from './../user-hashtags'
import { connect } from 'react-redux'
import { getHashtagPosts } from '../../../actions/hashtag'
import HashtagInfo from './info'
import MiddleSection from './middle-section'

class Hashtag extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      dispatch,
      match: { params },
    } = this.props
    dispatch(getHashtagPosts(params.hashtag))
  }

  componentWillReceiveProps = ({ match, dispatch }) => {
    if (this.props.match.url != match.url) {
      dispatch(getHashtagPosts(match.params.hashtag))
    }
    this.setState({ loading: false })
  }

  render() {
    let { loading } = this.state
    let {
      match: {
        params: { hashtag },
      },
      session: { username },
    } = this.props

    return (
      <div>
        <Title value={`#${hashtag}`} desc={`View posts with #${hashtag}`} />

        <FadeIn duration="300ms">
          <HashtagInfo hashtag={hashtag} />

          <div className="senapati">
            <div className="prajkumar">
              <MiddleSection loading={loading} hashtag={hashtag} />
            </div>

            <div className="srajkumar">
              <PopularHashtags />
              <UserHashtags username={username} />
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
  session: store.User.session,
})

export default connect(mapStateToProps)(Hashtag)
export { Hashtag as PureHashtag }
