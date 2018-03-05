import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { connect } from 'react-redux'
import { getPost } from '../../store/actions/post-a'
import { Redirect } from 'react-router-dom'
import Post from './post'
import End from '../others/end'
import Loading from '../others/loading'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { getUnreadMessages } from '../../store/actions/message-a'
import Suggested from '../others/suggested/suggested'
import CreateGroup from '../group/create-group/create-group'

@connect(store => (
  { post: store.Post.viewPost }
))

export default class ViewPost extends React.Component {

  state = {
    invalidPost: false,
    loading: true
  }

  componentDidMount = () => {
    let { match: { params: { post_id } }, dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
    post_id ? dispatch(getPost(post_id)) : null
  }

  componentWillReceiveProps = ({ post: { post_id } }) => {
    !post_id
      ? this.setState({ invalidPost: true })
      : this.setState({ loading: false })
  }

  render() {
    let
      { invalidPost, loading } = this.state,
      { post } = this.props

    return (
      <div>

        { invalidPost ? <Redirect to='/error/post_nf' /> : null }

        <Title value='View post' />

        <FadeIn duration='300ms'>

          { loading ? <Loading/> : null }

          <div className={`senapati view_senapati ${loading ? 'cLoading' : ''}`}>

            <div className='prajkumar'>
              <Post key={post.post_id} {...post} when='viewPost' />
              <End/>
            </div>

            <div className='srajkumar'>
              <Suggested />
              <CreateGroup/>
            </div>

          </div>
        </FadeIn>

      </div>
    )
  }
}
