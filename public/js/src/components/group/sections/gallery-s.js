import React, { Fragment } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import Nothing from '../../others/nothing'
import { connect } from 'react-redux'
import { getGroupPhotos } from '../../../store/actions/post-a'
import Spinner from '../../others/spinner'
import { profile_scroll } from '../../../utils/utils'
import PhotoGallery from 'react-photo-gallery'
import Overlay from '../../others/overlay'
import ImageTheatre from '../../others/image-theatre'
import End from '../../others/end'

@connect(store => (
  {
    gd: store.Group.group_details,
    photos: store.Post.photos
  }
))

export default class GroupGallery extends React.Component {

  state = {
    loading: true,
    showImage: false,
    imgSrc: '',
    filter: '',
    username: '',
    time: '',
    link: ''
  }

  componentDidMount = () => {
    profile_scroll()
    let { dispatch, gd: { group_id } } = this.props
    dispatch(getGroupPhotos(group_id))
  }

  componentWillReceiveProps = ({ dispatch, gd, gd: { group_id } }) => {
    this.props.gd != gd ? dispatch(getGroupPhotos(group_id)) : null
    this.setState({ loading: false })
  }

  selectPhoto = (e, { photo: { src, filter, username, post_time, post_id } }) => {
    this.setState({
      showImage: true,
      imgSrc: src,
      filter,
      username,
      time: post_time,
      link: `/post/${post_id}`
    })
  }

  render() {
    let
      { loading, showImage, imgSrc, filter, link, time, username: imageUsername } = this.state,
      { gd: { name }, photos } = this.props,
      len = photos.length,
      PHOTO_SET = []

    for (let f of photos) {
      PHOTO_SET.push({
        ...f,
        src: `/posts/${f.imgsrc}`,
        width: 15,
        height: 15,
        className: `g_photo ${f.filter}`
      })
    }

    return (
      <div>

        <Title value={`${name} group's gallery`} />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div className={`pro_senapati photos_senapati ${loading ? 'cLoading' : ''}`}>
            {
              len == 0 ?
                <Nothing mssg={`${name} group has no photos!!`} />
                : <PhotoGallery
                  photos={PHOTO_SET}
                  columns={4}
                  margin={7}
                  onClick={this.selectPhoto}
                />
            }
          </div>

          { !loading && len != 0 ? <End/> : null }

        </FadeIn>

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
                username={imageUsername}
                time={time}
                link={link}
              />
            </Fragment>
            : null
        }

      </div>
    )
  }
}
