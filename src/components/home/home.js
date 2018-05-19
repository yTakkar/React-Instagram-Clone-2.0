import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { connect } from 'react-redux'
import { getFeed } from '../../store/actions/post-a'
import Suggested from '../others/suggested/suggested'
import CreateGroup from '../group/create-group/create-group'
import PostItTeaser from '../post/post-it/post-it-teaser'
import { getUnreadMessages } from '../../store/actions/message-a'
import PopularHashtags from '../hashtag/popular-hashtags'
import { Instagram } from 'react-content-loader'
import Feed from './feed'

@connect(store => (
  { store }
))

export default class Home extends Component {

  state = {
    loading: true
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
    let { loading } = this.state

    return (
      <div>
        <Title value='Home' />

        <FadeIn duration='300ms'>

          <div className='senapati home_senapati' >
            <div className='prajkumar'>
              <PostItTeaser type='user' disabled={loading} />

              {
                loading ?
                  <div style={{ marginTop: 20 }} >
                    <Instagram/>
                    <Instagram/>
                    <Instagram/>
                  </div>
                  : null
              }

              <Feed />
            </div>

            <div className='srajkumar'>
              <Suggested when='home' />
              <PopularHashtags/>
              { !loading ? <CreateGroup/> : null }
            </div>
          </div>

        </FadeIn>
      </div>
    )
  }
}
