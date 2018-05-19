import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import PopularHashtags from './../popular-hashtags'
import UserHashtags from './../user-hashtags'
import { connect } from 'react-redux'
import { getHashtagPosts } from '../../../store/actions/hashtag-a'
import Post from '../../post/post/post'
import { Instagram } from 'react-content-loader'
import MapPosts from '../../post/map-posts/map-posts'
import SectionsEnd from '../../others/sections-end'
import HashtagInfo from './info'

@connect(store => (
  {
    posts: store.Hashtag.hashtagPosts,
    session: store.User.session
  }
))

export default class Hashtag extends Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, match: { params } } = this.props
    dispatch(getHashtagPosts(params.hashtag))
  }

  componentWillReceiveProps = ({ match, dispatch }) => {
    if (this.props.match.url != match.url) {
      dispatch(getHashtagPosts(match.params.hashtag))
    }
    this.setState({ loading: false })
  }

  render() {
    let
      { loading } = this.state,
      {
        match: { params: { hashtag } },
        posts,
        session: { username }
      } = this.props,
      len = posts.length,
      map_posts = posts.map(p =>
        <Post key={p.post_id} {...p} when='hashtag' />
      )

    return (
      <div>

        <Title
          value={`#${hashtag}`}
          desc={`View posts with #${hashtag}`}
        />

        <FadeIn duration='300ms'>
          <HashtagInfo len={len} hashtag={hashtag} />

          <div className='senapati' >

            <div className='prajkumar'>
              { loading ? <Instagram/> : null }

              { len == 0 ? <div style={{ marginTop: 10 }} /> : null }

              <MapPosts
                posts={map_posts}
                nothingMssg={`No post with #${hashtag} tag found!!`}
              />

              <SectionsEnd len={len} />
              <div style={{ marginBottom: 20 }} />
            </div>

            <div className='srajkumar'>
              <PopularHashtags/>
              <UserHashtags username={username} />
            </div>
          </div>
        </FadeIn>

      </div>
    )
  }
}
