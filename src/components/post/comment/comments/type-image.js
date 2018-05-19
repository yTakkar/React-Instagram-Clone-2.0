import React, { Component, Fragment } from 'react'
import Overlay from '../../../others/overlay'
import ImageTheatre from '../../../others/image-theatre'
import PropTypes from 'prop-types'

export default class CommentTypeImage extends Component {

  state = {
    openImage: false
  }

  toggleImage = () =>
    this.setState({ openImage: !this.state.openImage })

  render() {
    let { commentSrc } = this.props
    let { openImage } = this.state

    return (
      <Fragment>
        <img
          className='comments_img'
          onClick={() => this.setState({ openImage: true })}
          src={`/comments/${commentSrc}`}
        />

        {
          openImage ?
            <Fragment>
              <Overlay
                close_on_click={true}
                close={() => this.setState({ openImage: false })}
                opacity={0.9}
              />
              <ImageTheatre
                imgSrc={`/comments/${commentSrc}`}
                showInfo={false}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

CommentTypeImage.propTypes = {
  commentSrc: PropTypes.string.isRequired
}
