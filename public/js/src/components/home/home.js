import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { connect } from 'react-redux'
import $ from 'jquery'
import { getFeed } from '../../store/actions/post-a'
import Loading from '../others/loading'
import Nothing from '../others/nothing'
import Post from '../post/post'
import End from '../others/end'
import MessageNotify from '../others/message-notify'
import Suggested from '../others/suggested/suggested'
import CreateGroup from '../group/create-group/create-group'
import PostItTeaser from '../post/post-it/post-it-teaser'
import { getUnreadMessages } from '../../store/actions/message-a'

@connect(store => {
  return {
    feed: store.Post.feed,
    posted: store.Post.posted
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
      username = $('.data').data('username'),
      { loading } = this.state,
      { feed, posted } = this.props,
      len = feed.length,
      map_feed = feed.map(f =>
        <Post key={f.post_id} {...f} when='feed' />
      )

    return (
      <div>

        <Title value='Home' />

        <FadeIn duration='300ms'>

          { loading ? <Loading/> : null }

          <div className={`senapati home_senapati ${loading ? 'cLoading' : ''}`} >

            <div className='prajkumar'>
              <PostItTeaser type='user' />

              <div
                className='posts_div'
                style={{ marginTop: len == 0 ? 10 : 0 }}
              >

                {
                  posted ?
                    <MessageNotify
                      url={`/profile/${username}`}
                      btnText='Checkout'
                      message='Checkout your profile page to see your recent post!!'
                    />
                    : null
                }

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
              <CreateGroup/>
            </div>

          </div>

        </FadeIn>

      </div>
    )
  }
}
