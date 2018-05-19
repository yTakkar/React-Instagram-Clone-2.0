import React, { Component, Fragment } from 'react'
import Nothing from '../../others/nothing'
import Gallery from 'react-photo-gallery'
import { connect } from 'react-redux'
import Overlay from '../../others/overlay'
import ImageTheatre from '../../others/image-theatre'

@connect(store => (
  { photos: store.Explore.photos }
))

export default class ExplorePhotoGallery extends Component {

  state = {
    showImage: false,
    imgSrc: '',
    filter: '',
    username: '',
    time: '',
    link: ''
  }

  selectPhoto = (e, { photo }) => {
    let { src, filter, username, post_time, post_id } = photo
    this.setState({
      imgSrc: src,
      filter,
      username,
      time: post_time,
      link: `/post/${post_id}`,
      showImage: true,
    })
  }

  render() {
    let { showImage, imgSrc, filter, username, time, link } = this.state
    let { photos } = this.props
    let len = photos.length
    let PHOTO_SET = []

    for (let f of photos) {
      PHOTO_SET.push({
        ...f,
        src: `/posts/${f.imgsrc}`,
        width: 15,
        height: 15,
        className: `${f.filter}`
      })
    }

    return (
      <Fragment>
        <div
          className='m_wrapper'
          style={{ width: len == 0 ? 500 : null }}
        >
          {
            len == 0 ?
              <Nothing value='Sorry, no photos to explore!!' />
              : <Gallery
                photos={PHOTO_SET}
                columns={4}
                margin={7}
                onClick={this.selectPhoto}
              />
          }
        </div>

        {
          showImage ?
            <Fragment>
              <Overlay
                close_on_click={true}
                close={() => this.setState({ showImage: false })}
                opacity={0.9}
              />
              <ImageTheatre
                imgSrc={imgSrc}
                filter={filter}
                username={username}
                time={time}
                link={link}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}
