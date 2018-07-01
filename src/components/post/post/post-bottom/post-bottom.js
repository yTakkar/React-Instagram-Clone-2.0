import React, { Component } from 'react'
import { connect } from 'react-redux'
import { humanReadable } from '../../../../utils/utils'
import Comments from '../../comment/comments/comments'
import ImageComment from '../../comment/image-comment/imageComment'
import StickerComment from '../../comment/sticker-comment/stickerComment'
import TextComment from '../../comment/text-comment/text-comment'
import { shape, number, string, array } from 'prop-types'
import AppLink from '../../../others/link/link'

class PostBottom extends Component {
  state = {
    comments_count: 0,
  }

  componentDidMount = () =>
    this.setState({
      comments_count: this.props.postDetails.comments_count,
    })

  incrementComments = () =>
    this.setState({
      comments_count: ++this.state.comments_count,
    })

  render() {
    let { comments_count } = this.state
    let {
      postDetails,
      postDetails: { post_id, when, comments },
      session,
    } = this.props

    let childProps = {
      postDetails,
      incrementComments: this.incrementComments,
    }

    return (
      <div>
        <AppLink
          url={`/post/${post_id}`}
          className="p_comments"
          label={humanReadable(comments_count, 'comment')}
        />
        <div className="p_cit">
          <div className="p_cit_img">
            <img src={`/users/${session}/avatar.jpg`} />
          </div>

          <div className="p_cit_main">
            <TextComment {...childProps} />

            <div className="p_cit_tool">
              <StickerComment {...childProps} />
              <ImageComment {...childProps} />
            </div>
          </div>
        </div>

        <Comments
          when={when}
          comments={comments}
          decrementComments={() =>
            this.setState({ comments_count: --comments_count })
          }
        />
      </div>
    )
  }
}

PostBottom.propTypes = {
  postDetails: shape({
    comments_count: number.isRequired,
    post_id: number.isRequired,
    when: string.isRequired,
    user: number.isRequired,
    comments: array,
  }).isRequired,
}

const mapStateToProps = store => ({
  session: store.User.session.id,
})

export default connect(mapStateToProps)(PostBottom)
export { PostBottom as PurePostBottom }
