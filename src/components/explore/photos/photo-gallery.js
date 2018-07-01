import React, { Component, Fragment } from 'react'
import Nothing from '../../others/nothing'
import Gallery from 'react-photo-gallery'
import { connect } from 'react-redux'
import ImageTheatre from '../../others/imageTheatre/imageTheatre'

class ExplorePhotoGallery extends Component {
  state = {
    showImage: false,
    src: '',
    filter: '',
    username: '',
    time: '',
    link: '',
  }

  selectPhoto = (e, { photo }) => {
    let { src, filter, username, post_time, post_id } = photo
    this.setState({
      src,
      filter,
      username,
      time: post_time,
      link: `/post/${post_id}`,
      showImage: true,
    })
  }

  render() {
    let { showImage, src, filter, username, time, link } = this.state
    let { photos } = this.props
    let len = photos.length
    let PHOTO_SET = []

    for (let f of photos) {
      PHOTO_SET.push({
        ...f,
        src: `/posts/${f.imgsrc}`,
        width: 15,
        height: 15,
        className: `${f.filter}`,
      })
    }

    return (
      <Fragment>
        <div className="m_wrapper" style={{ width: len == 0 ? 500 : null }}>
          {len == 0 ? (
            <Nothing value="Sorry, no photos to explore!!" />
          ) : (
            <Gallery
              photos={PHOTO_SET}
              columns={4}
              margin={7}
              onClick={this.selectPhoto}
            />
          )}
        </div>

        {showImage && (
          <ImageTheatre
            imgSrc={src}
            filter={filter}
            username={username}
            time={time}
            link={link}
            back={() => this.setState({ showImage: false })}
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  photos: store.Explore.photos,
})

export default connect(mapStateToProps)(ExplorePhotoGallery)
export { ExplorePhotoGallery as PureExplorePhotoGallery }
