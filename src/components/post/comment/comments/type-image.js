import React, { Component, Fragment } from 'react'
import ImageTheatre from '../../../others/imageTheatre/imageTheatre'
import PropTypes from 'prop-types'

export default class CommentTypeImage extends Component {
  state = {
    openImage: false,
  }

  toggleImage = () => this.setState({ openImage: !this.state.openImage })

  render() {
    let { commentSrc } = this.props
    let { openImage } = this.state

    return (
      <Fragment>
        <img
          className="comments_img"
          onClick={() => this.setState({ openImage: true })}
          src={`/comments/${commentSrc}`}
        />

        {openImage && (
          <ImageTheatre
            imgSrc={`/comments/${commentSrc}`}
            showInfo={false}
            back={() => this.setState({ openImage: false })}
          />
        )}
      </Fragment>
    )
  }
}

CommentTypeImage.propTypes = {
  commentSrc: PropTypes.string.isRequired,
}
