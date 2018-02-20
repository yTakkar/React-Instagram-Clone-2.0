import React from 'react'
import { FadeIn } from 'animate-components'
import Nothing from '../../others/nothing'
import End from '../../others/end'
import Spinner from '../../others/spinner'
import { connect } from 'react-redux'
import { getSharedPosts } from '../../../store/actions/post-a'
import Post from '../../post/post'
import { Me, profile_scroll } from '../../../utils/utils'
import Title from '../../others/title'
import Suggested from '../../others/suggested/suggested'

@connect(store => {
  return {
    ud: store.User.user_details,
    shared: store.Post.shared
  }
})

export default class Shared extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    profile_scroll()
    let { ud: { id }, dispatch } = this.props
    dispatch(getSharedPosts(id))
  }

  componentWillReceiveProps = ({ dispatch, ud, ud: { id } }) => {
    this.props.ud != ud ? dispatch(getSharedPosts(id)) : null
    this.setState({ loading: false })
  }

  render() {
    let
      { loading } = this.state,
      { shared, param: username, ud: { id } } = this.props,
      len = shared.length,
      map_posts = shared.map(p =>
        <Post key={p.share_id} {...p} when='shared' />
      )

    return (
      <div>
        <FadeIn duration='300ms' >

          { loading ? <Spinner/> : null }

          <Title value={`${username}'s shared posts`} />

          <div className={`senapati pro_senapati ${loading ? 'cLoading' : ''}`} >

            <div className='srajkumar'>
              <Suggested/>
            </div>

            <div className='prajkumar'>
              {
                len == 0
                  ? <Nothing
                    mssg={`No one shared posts with ${Me(id) ? 'you' : username}!!`}
                  />
                  : <FadeIn duration='500ms'>{ map_posts }</FadeIn>
              }
            </div>

          </div>

          { !loading ? <End/> : null }

        </FadeIn>
      </div>
    )
  }
}
