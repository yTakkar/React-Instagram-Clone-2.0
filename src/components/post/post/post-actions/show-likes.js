import React, { Component, Fragment } from 'react'
import { humanReadable } from '../../../../utils/utils'
import Overlay from '../../../others/overlay'
import Likes from '../../like/likes/likes'

export default class ShowLikes extends Component {

  state = {
    showLikes: false
  }

  toggleLikes = () =>
    this.setState({ showLikes: !this.state.showLikes })

  render() {
    let {
      post_id, likes_count, decrementLikes
    } = this.props
    let { showLikes } = this.state

    return (
      <Fragment>
        <span
          className='p_likes likes'
          onClick={this.toggleLikes}
        >{humanReadable(likes_count, 'like')}
        </span>

        {
          showLikes ?
            <Fragment>
              <Overlay/>
              <Likes
                post={post_id}
                back={this.toggleLikes}
                decrementLikes={decrementLikes}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}
