import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { connect } from 'react-redux'
import { getFeed } from '../../store/actions/post-a'
import Nothing from '../others/nothing'
import Post from '../post/post'
import End from '../others/end'
import Suggested from '../others/suggested/suggested'
import CreateGroup from '../group/create-group/create-group'
import PostItTeaser from '../post/post-it/post-it-teaser'
import { getUnreadMessages } from '../../store/actions/message-a'
import PopularHashtags from '../hashtag/popular-hashtags'
import { Instagram } from 'react-content-loader'

@connect(store => {
  return {
    feed: store.Post.feed
  }
})

export default class Home extends React.Component {

  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getFeed())
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { loading } = this.state,
      { feed } = this.props,
      len = feed.length,
      map_feed = feed.map(f =>
        <Post key={f.post_id} {...f} when='feed' />
      )

    return (
      <div>

        <Title value='Home' />

        <FadeIn duration='300ms'>

          <div className='senapati home_senapati' >

            <div className='prajkumar'>

              <PostItTeaser type='user' />

              {
                loading ?
                  <div style={{ marginTop: 20 }} >
                    <Instagram/>
                    <Instagram/>
                    <Instagram/>
                  </div>
                  : null
              }

              <div
                className='posts_div'
                style={{ marginTop: len == 0 ? 10 : 0 }}
              >

                {
                  len == 0 ?
                    <Nothing mssg="Looks like you're new, Follow some to fill up your feed or post from above options!!" />
                    : <FadeIn duration='500ms'>{ map_feed }</FadeIn>
                }
              </div>

              { len != 0 ? <End/> : null }

            </div>

            <div className='srajkumar'>
              <Suggested when='home' />
              <PopularHashtags/>
              <CreateGroup/>
            </div>

          </div>

        </FadeIn>

      </div>
    )
  }
}
