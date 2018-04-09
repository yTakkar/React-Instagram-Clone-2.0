import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import PopularHashtags from './popular-hashtags'
import UserHashtags from './user-hashtags'
import $ from 'jquery'
import End from '../others/end'
import { connect } from 'react-redux'
import { getHashtagPosts } from '../../store/actions/hashtag-a'
import Post from '../post/post'
import Nothing from '../others/nothing'
import { humanReadable } from '../../utils/utils'
import { Instagram } from 'react-content-loader'

@connect(store => (
  { posts: store.Hashtag.hashtagPosts }
))

export default class Hashtag extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, match: { params: { hashtag } } } = this.props
    dispatch(getHashtagPosts(hashtag))
  }

  componentWillReceiveProps = ({ match, dispatch }) => {
    if (this.props.match.url != match.url) {
      dispatch(getHashtagPosts(match.params.hashtag))
    }
    this.setState({ loading: false })
  }

  render() {
    let
      username = $('.data').data('username'),
      { loading } = this.state,
      {
        match: { params: { hashtag } },
        posts
      } = this.props,
      len = posts.length,
      map_posts = posts.map(p =>
        <Post key={p.post_id} {...p} />
      )

    return (
      <div>

        <Title value={`#${hashtag}`} />

        <FadeIn duration='300ms'>

          <div className='hashtag_info'>
            <span>#{hashtag}</span>
            <span className='no_of_tag_peop'>{ humanReadable(len, 'post') }</span>
          </div>

          <div className='senapati' >

            <div className='prajkumar'>
              { loading ? <Instagram/> : null }
              {
                len == 0
                  ? <div style={{ marginTop: 10 }} >
                    <Nothing mssg={`No post with #${hashtag} tag found!!`} />
                  </div>
                  : <FadeIn duration='500ms'>{ map_posts }</FadeIn>
              }
              { len != 0 ? <End/> : null }
            </div>

            <div className='srajkumar'>
              <PopularHashtags/>
              <UserHashtags param={username} />
            </div>
          </div>
        </FadeIn>

      </div>
    )
  }
}
