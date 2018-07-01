import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { getGroupPhotos } from '../../../../actions/post'
import End from '../../../others/end'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import GroupPhotos from './photos'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class GroupGallery extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, gd } = this.props
    dispatch(getGroupPhotos(gd.group_id))
  }

  componentWillReceiveProps = ({ dispatch, gd }) => {
    this.props.gd != gd && dispatch(getGroupPhotos(gd.group_id))
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      {
        gd: { name },
        photos,
      } = this.props,
      len = photos.length

    return (
      <div>
        <Title value={`${name} group's gallery`} />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames(
              'pro_senapati',
              'photos_senapati',
              cLoading(loading)
            )}
          >
            <GroupPhotos />
          </div>

          {!loading && len != 0 && <End />}
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
  photos: store.Post.photos,
})

export default connect(mapStateToProps)(GroupGallery)
export { GroupGallery as PureGroupGallery }
