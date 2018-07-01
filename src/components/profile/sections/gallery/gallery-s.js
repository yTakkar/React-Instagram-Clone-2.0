import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { getPhotos } from '../../../../actions/post'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import End from '../../../others/end'
import PropTypes from 'prop-types'
import UserPhotos from './photos'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class Gallery extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, ud } = this.props
    dispatch(getPhotos(ud.id))
  }

  componentWillReceiveProps = ({ dispatch, ud }) => {
    this.props.ud != ud ? dispatch(getPhotos(ud.id)) : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      { param: username, photos } = this.props,
      len = photos.length

    return (
      <div>
        <Title value={`${username}'s gallery`} />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames(
              'pro_senapati',
              'photos_senapati',
              cLoading(loading)
            )}
          >
            <UserPhotos />
          </div>

          {!loading && len != 0 && <End />}
        </FadeIn>
      </div>
    )
  }
}

Gallery.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  photos: store.Post.photos,
})

export default connect(mapStateToProps)(Gallery)
export { Gallery as PureGallery }
