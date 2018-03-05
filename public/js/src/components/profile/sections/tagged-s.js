import React from 'react'
import { FadeIn } from 'animate-components'
import Nothing from '../../others/nothing'
import End from '../../others/end'
import Spinner from '../../others/spinner'
import { connect } from 'react-redux'
import { getTaggedPosts } from '../../../store/actions/post-a'
import Post from '../../post/post'
import { Me, profile_scroll } from '../../../utils/utils'
import Title from '../../others/title'
import Suggested from '../../others/suggested/suggested'

@connect(store => (
  {
    ud: store.User.user_details,
    tagged: store.Post.tagged
  }
))

export default class Tagged extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    profile_scroll()
    let { ud: { id }, dispatch } = this.props
    dispatch(getTaggedPosts(id))
  }

  componentWillReceiveProps = ({ dispatch, ud, ud: { id } }) => {
    this.props.ud != ud ? dispatch(getTaggedPosts(id)) : null
    this.setState({ loading: false })
  }

  render() {
    let
      { loading } = this.state,
      { tagged, param: username, ud: { id } } = this.props,
      len = tagged.length,
      map_posts = tagged.map(p =>
        <Post key={p.post_id} {...p} when='tagged' />
      )

    return (
      <div>
        <FadeIn duration='300ms' >

          { loading ? <Spinner/> : null }

          <Title value={`${username}'s tagged posts`} />

          <div className={`senapati pro_senapati ${loading ? 'cLoading' : ''}`} >

            <div className='srajkumar'>
              <Suggested when='profile' />
            </div>

            <div className='prajkumar'>
              {
                len == 0
                  ? <Nothing
                    mssg={Me(id) ? 'You are not tagged in any post!!' : `${username} is not tagged in any post!!`}
                  />
                  : <FadeIn duration='500ms'>{ map_posts }</FadeIn>
              }
            </div>

          </div>

          { len != 0 && !loading ? <End/> : null }

        </FadeIn>
      </div>
    )
  }
}
