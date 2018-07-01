import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import MaterialIcon from '../../../others/icons/material-icon'
import BannerAddTagsLink from './add-tags-link'
import BannerMapTags from './map-tags'

export default class BannerTags extends Component {
  state = {
    showTags: false,
  }

  toggleTags = () => this.setState({ showTags: !this.state.showTags })

  render() {
    let { showTags } = this.state

    return (
      <Fragment>
        <div className="pro_exp_more" onClick={this.toggleTags}>
          <span data-tip="Tags">
            <MaterialIcon icon="expand_more" />
          </span>
        </div>

        {showTags ? (
          <FadeIn duration="300ms">
            <div className="pro_tags">
              <BannerMapTags />
              <BannerAddTagsLink />
            </div>
          </FadeIn>
        ) : null}
      </Fragment>
    )
  }
}
