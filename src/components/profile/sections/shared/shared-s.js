import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { getSharedPosts } from '../../../../actions/post'
import Post from '../../../post/post/post'
import { Me, bottomScroll, cLoading } from '../../../../utils/utils'
import Title from '../../../others/title'
import Suggested from '../../../others/suggested/suggested'
import PropTypes from 'prop-types'
import MapPosts from '../../../post/map-posts/map-posts'
import SectionsEnd from '../../../others/sections-end'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class Shared extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { ud, dispatch } = this.props
    dispatch(getSharedPosts(ud.id))
  }

  componentWillReceiveProps = ({ dispatch, ud }) => {
    this.props.ud != ud ? dispatch(getSharedPosts(ud.id)) : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      {
        shared,
        param: username,
        ud: { id },
      } = this.props,
      len = shared.length,
      map_posts = shared.map(p => (
        <Post key={p.share_id} {...p} when="shared" />
      ))

    return (
      <div>
        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <Title value={`${username}'s shared posts`} />

          <div
            className={classNames(
              'senapati',
              'pro_senapati',
              cLoading(loading)
            )}
          >
            <div className="srajkumar">
              <Suggested />
            </div>

            <div className="prajkumar">
              <MapPosts
                posts={map_posts}
                nothingMssg={`No one shared posts with ${
                  Me(id) ? 'you' : username
                }!!`}
              />
            </div>
          </div>

          <SectionsEnd len={len} loading={loading} />
        </FadeIn>
      </div>
    )
  }
}

Shared.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  shared: store.Post.shared,
})

export default connect(mapStateToProps)(Shared)
export { Shared as PureShared }
