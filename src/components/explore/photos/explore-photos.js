import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getPhotosToExplore } from '../../../actions/explore'
import ExplorePhotoGallery from './photo-gallery'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'
import { t } from '../../../utils/translation'

class ExpPhotos extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => this.props.dispatch(getPhotosToExplore())

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { loading } = this.state
    let { lang } = this.props

    return (
      <div>
        <Title value={t(lang, 'explore', 'explorePhotos')} />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames('m_div', 'explore_photos', cLoading(loading))}
            style={{ marginTop: 0 }}
          >
            <ExplorePhotoGallery />
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
  lang: store.Language.language
})

export default connect(mapStateToProps)(ExpPhotos)
export { ExpPhotos as PureExpPhotos }
