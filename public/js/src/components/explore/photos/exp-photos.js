import React, { Fragment } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getPhotosToExplore } from '../../../store/actions/explore-a'
import Spinner from '../../others/spinner'
import Nothing from '../../others/nothing'
import Gallery from 'react-photo-gallery'
import Overlay from '../../others/overlay'
import ImageTheatre from '../../others/image-theatre'
import $ from 'jquery'

@connect(store => (
  { photos: store.Explore.photos }
))

export default class ExpPhotos extends React.Component {

  state = {
    loading: true,
    showImage: false,
    imgSrc: '',
    filter: '',
    username: '',
    time: '',
    link: ''
  }

  componentDidMount = () =>
    this.props.dispatch(getPhotosToExplore())

  componentWillReceiveProps = () => {
    this.setState({ loading: false })
    $('.explore_photos').find('img').addClass('exp_photo')
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
      { loading, showImage, imgSrc, filter, link, time, username } = this.state,
      { photos } = this.props,
      len = photos.length,
      PHOTO_SET = []

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
      <div>

        <Title value='Explore photos' />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div
            className={`m_div explore_photos ${loading ? 'cLoading' : ''}`}
            style={{ marginTop: 0 }}
          >
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
          </div>

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
                username={username}
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
