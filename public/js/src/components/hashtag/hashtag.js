import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import PopularHashtags from './popular-hashtags'
import UserHashtags from './user-hashtags'
import $ from 'jquery'
import End from '../others/end'
import { connect } from 'react-redux'
import { getHashtagPosts } from '../../store/actions/hashtag-a'
import Loading from '../others/loading'
import Post from '../post/post'
import Nothing from '../others/nothing'

@connect(store => {
  return {
    posts: store.Hashtag.hashtagPosts
  }
})

export default class Hashtag extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, match: { params: { hashtag } } } = this.props
    dispatch(getHashtagPosts(hashtag))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

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

          { loading ? <Loading/> : null }

          <div className={`senapati ${loading ? 'cLoading' : ''}`} >
            <div className='prajkumar'>
              {
                len == 0 ?
                  <Nothing mssg={`No post with #${hashtag} tag found!!`} />
                  : map_posts
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
