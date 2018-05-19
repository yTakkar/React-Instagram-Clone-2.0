import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { getPhotos } from '../../../../store/actions/post-a'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import End from '../../../others/end'
import PropTypes from 'prop-types'
import UserPhotos from './photos'
import IsLoading from '../../../others/isLoading'

@connect(store => (
  {
    ud: store.User.user_details,
    photos: store.Post.photos
  }
))

export default class Gallery extends Component {

  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, ud } = this.props
    dispatch(getPhotos(ud.id))
  }

  componentWillReceiveProps = ({ dispatch, ud }) => {
    this.props.ud != ud
      ? dispatch(getPhotos(ud.id))
      : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let
      { loading } = this.state,
      { param: username, photos } = this.props,
      len = photos.length

    return (
      <div>

        <Title value={`${username}'s gallery`} />

        <FadeIn duration='300ms'>

          <IsLoading loading={loading} />

          <div className={`pro_senapati photos_senapati ${cLoading(loading)}`}>
            <UserPhotos/>
          </div>

          { !loading && len != 0 ? <End/> : null }

        </FadeIn>
      </div>
    )
  }
}

Gallery.propTypes = {
  param: PropTypes.string.isRequired
}
