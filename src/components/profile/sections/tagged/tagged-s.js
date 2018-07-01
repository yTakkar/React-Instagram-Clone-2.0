import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { getTaggedPosts } from '../../../../actions/post'
import Post from '../../../post/post/post'
import { Me, bottomScroll, cLoading } from '../../../../utils/utils'
import Title from '../../../others/title'
import Suggested from '../../../others/suggested/suggested'
import PropTypes from 'prop-types'
import MapPosts from '../../../post/map-posts/map-posts'
import SectionsEnd from '../../../others/sections-end'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class Tagged extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { ud, dispatch } = this.props
    dispatch(getTaggedPosts(ud.id))
  }

  componentWillReceiveProps = ({ dispatch, ud }) => {
    this.props.ud != ud ? dispatch(getTaggedPosts(ud.id)) : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      {
        tagged,
        param: username,
        ud: { id },
      } = this.props,
      len = tagged.length,
      map_posts = tagged.map(p => <Post key={p.post_id} {...p} when="tagged" />)

    return (
      <div>
        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <Title value={`${username}'s tagged posts`} />

          <div
            className={classNames(
              'senapati',
              'pro_senapati',
              cLoading(loading)
            )}
          >
            <div className="srajkumar">
              <Suggested when="profile" />
            </div>

            <div className="prajkumar">
              <MapPosts
                posts={map_posts}
                nothingMssg={
                  Me(id)
                    ? 'You are not tagged in any post!!'
                    : `${username} is not tagged in any post!!`
                }
              />
            </div>
          </div>

          <SectionsEnd len={len} loading={loading} />
        </FadeIn>
      </div>
    )
  }
}

Tagged.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  tagged: store.Post.tagged,
})

export default connect(mapStateToProps)(Tagged)
export { Tagged as PureTagged }
