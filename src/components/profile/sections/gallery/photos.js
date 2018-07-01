import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Me } from '../../../../utils/utils'
import Nothing from '../../../others/nothing'
import PhotoGallery from 'react-photo-gallery'
import ImageTheatre from '../../../others/imageTheatre/imageTheatre'

class UserPhotos extends Component {
  state = {
    showImage: false,
    imgSrc: '',
    filter: '',
    username: '',
    time: '',
    link: '',
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
    let {
      showImage,
      imgSrc,
      filter,
      username: imgUsername,
      time,
      link,
    } = this.state
    let {
      photos,
      ud: { id, username },
    } = this.props
    let len = photos.length
    let PHOTO_SET = []

    for (let f of photos) {
      PHOTO_SET.push({
        ...f,
        src: `/posts/${f.imgsrc}`,
        width: 15,
        height: 15,
        className: `g_photo ${f.filter}`,
      })
    }

    return (
      <Fragment>
        {len == 0 ? (
          <Nothing
            mssg={
              Me(id) ? 'You have no photos!!' : `${username} has no photos!!`
            }
          />
        ) : (
          <PhotoGallery
            photos={PHOTO_SET}
            columns={4}
            margin={7}
            onClick={this.selectPhoto}
          />
        )}

        {showImage && (
          <ImageTheatre
            imgSrc={imgSrc}
            filter={filter}
            username={imgUsername}
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
  ud: store.User.user_details,
  photos: store.Post.photos,
})

export default connect(mapStateToProps)(UserPhotos)
export { UserPhotos as PureUserPhotos }
