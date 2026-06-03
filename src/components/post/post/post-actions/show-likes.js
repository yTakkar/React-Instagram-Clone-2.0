import React, { Component, Fragment } from 'react'
import Likes from '../../like/likes/likes'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import { t } from '../../../../utils/translation'

class ShowLikes extends Component {
  state = {
    showLikes: false,
  }

  toggleLikes = () => this.setState({ showLikes: !this.state.showLikes })

  render() {
    let { post_id, likes_count, decrementLikes, lang } = this.props
    let { showLikes } = this.state

    return (
      <Fragment>
        <span className="p_likes likes" onClick={this.toggleLikes}>
          {likes_count == 0 
            ? t(lang, 'post', 'noLikes')
            : likes_count == 1
              ? `1 ${t(lang, 'post', 'like')}`
              : `${likes_count} ${t(lang, 'post', 'likes')}`
          }
        </span>

        {showLikes && (
          <Likes
            post={post_id}
            back={this.toggleLikes}
            decrementLikes={decrementLikes}
          />
        )}
      </Fragment>
    )
  }
}

ShowLikes.propTypes = {
  post_id: number.isRequired,
  likes_count: number.isRequired,
  decrementLikes: func.isRequired,
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(ShowLikes)
