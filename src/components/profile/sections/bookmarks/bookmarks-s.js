import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FadeIn } from 'animate-components'
import Nothing from '../../../others/nothing'
import { Me, bottomScroll, cLoading } from '../../../../utils/utils'
import { getBookmarkedPosts } from '../../../../actions/post'
import Post from '../../../post/post/post'
import Title from '../../../others/title'
import Suggested from '../../../others/suggested/suggested'
import PropTypes from 'prop-types'
import MapPosts from '../../../post/map-posts/map-posts'
import SectionsEnd from '../../../others/sections-end'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class Bookmarks extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      dispatch,
      ud: { id },
    } = this.props
    dispatch(getBookmarkedPosts(id))
  }

  componentWillReceiveProps({ dispatch, ud }) {
    this.props.ud != ud ? dispatch(getBookmarkedPosts(ud.id)) : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      {
        param: username,
        ud: { id },
        bookmarks,
      } = this.props,
      len = bookmarks.length,
      map_posts = bookmarks.map(p => (
        <Post key={p.post_id} {...p} when="bookmarks" />
      ))

    return (
      <div>
        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <Title value={`${username}'s bookmarked posts`} />

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
              {Me(id) ? (
                <MapPosts
                  posts={map_posts}
                  nothingMssg={
                    Me(id)
                      ? 'You have no bookmarked posts!!'
                      : `${username} has no bookmarked posts!!`
                  }
                />
              ) : (
                <Nothing
                  mssg={`${username}'s bookmarked posts are private!!`}
                />
              )}
            </div>
          </div>

          <SectionsEnd len={len} loading={loading} />
        </FadeIn>
      </div>
    )
  }
}

Bookmarks.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  bookmarks: store.Post.bookmarks,
  ud: store.User.user_details,
})

export default connect(mapStateToProps)(Bookmarks)
export { Bookmarks as PureBookmarks }
